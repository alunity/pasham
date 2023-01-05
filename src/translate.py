from deep_translator import GoogleTranslator  # type: ignore


def translate(text, given_dest):
    word = GoogleTranslator(
        source="auto", target=given_dest).translate(text)
    return word
