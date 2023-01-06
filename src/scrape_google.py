from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager  # type: ignore
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException


def scrape_google(query):
    x = "%20".join(query.split(" "))
    x = x.replace("+", "%2B")

    options = Options()
    options.headless = True
    options.add_argument("--window-size=1920,1200")
    options.add_argument("--disable-logging")
    options.add_argument("--log-level=3")
    options.add_experimental_option('excludeSwitches', ['enable-logging'])

    driver = webdriver.Chrome(service=ChromeService(
        ChromeDriverManager().install()), options=options)
    driver.get('https://www.google.com/search?q=' + x)

    # Knowledge Card
    try:
        knowledge_card = {}
        #   Categories: Description
        div = driver.find_element(By.ID, "rhs")

        info = div.text.split("\n")

        knowledge_card["Description"] = info[info.index("Description") + 1]

        for i in info:
            try:
                i.index(":")
                tmp = i.split(":")
                knowledge_card[tmp[0]] = tmp[1]
            except (IndexError, ValueError):
                pass

        return knowledge_card
    except (NoSuchElementException, ValueError):
        pass
        # print("No knowledge card")

    # Definitions
    try:
        div = driver.find_element(By.CLASS_NAME, "yc7KLc")
        info = div.text.split("\n")
        word_types = ["adjective", "verb", "adverb",
                      "pronoun", "exclamation", "noun"]

        filter_out = ["Feedback", "See more", "Similar-sounding words"]

        data = []
        prev_mode = ""
        mode = ""

        for i in info:
            word_type = ""
            for j in word_types:
                if j in i and i.index(j) == 0:
                    word_type = j
                    break
            if word_type != "":
                prev_mode = mode
                mode = i

                if prev_mode == "":
                    prev_mode = mode
            elif i == "Similar:":
                mode = ""
            elif i.split(".")[0].isnumeric():
                mode = prev_mode
            elif i != i.upper() and mode != "" and i not in filter_out:
                # Check for quote
                try:
                    i.index('"')
                except ValueError:
                    data.append(i)
        return data

    except NoSuchElementException:
        pass

    # Math
    try:
        span = driver.find_element(By.CLASS_NAME, "qv3Wpe")
        return span.text
    except NoSuchElementException:
        pass

    # Featured search
    try:
        span = driver.find_element(By.CLASS_NAME, "hgKElc")
        return span.text
    except NoSuchElementException:
        pass

    return -1
