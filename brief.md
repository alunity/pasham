# Computing Competition 2022/23
The competition is open to year 10, 11 and year 12 students in groups of 2-3 studying Computer Science.
You may choose to code in any programming language that is a higher level language. ***In other words not Scratch (or any other block language)!***

You must have your final submission code uploaded to the competition GitHub Classroom as shown by your teacher.
You must also submit a short video presentation showcasing your endeavour no longer than 2 mins maximum. You can do this using [MS Stream](https://web.microsoftstream.com/) with your office365 account. 
<sub>Videos here are private by default to our school and you can record your screen easily.</sub>

- Final submissions must be in by Fri 6th Jan
- Peer votes will be submitted no later than Fri 14th Jan
- Winners will be announced the following week.

## Your Challenge 
You are tasked with creating a new virtual assistant for Mr Mulla called "Pasham" such as the likes of Google Assistant or Alexa.

You will be graded on the features that your virtual assistant will include. Your grade will be higher based on how many of the following faetures you can incorporate:

- The virtual assistant activates with a button press using a GUI interface
- The virtual assistant activates with the voice command, "Hey Pasham!"
    - On request, "tell me a joke", Pasham tells a funny joke,
    - On request, "How's the weather today, Pasham returns the weather in London.
    - On request, "Tell me a recipe", Pasham picks a random recipe from the list of recipes provided in the resources directory :-)
    - On request, "Is it *Turkish* or *Greek* Coffee?", Pasham rightfully points out that **it is indeed Turkish Coffee** and cites the unesco declaration of it's inclusion under the Representative List of the Intangible Cultural Heritage of Humanity [Unesco citation](https://ich.unesco.org/en/decisions/8.COM/8.28), [Unesco information](https://ich.unesco.org/en/what-is-intangible-heritage-00003).
    - on request, "sing me happy birthday", Pasham sings happy birthday!

## Teacher Grading 60%

You will be graded on:

- Design of your program - How you will create the program (no more than 200 words)
    - 0 marks no-poor explenation
    - 1 mark partial explenation
    - 2 marks excellent detail
- efficiency of your code (variable names, functions etc)
    - 0 marks poor var names
    - 1 mark some naming is sensible / some efficient coding
    - 2 marks Excellet naming of variables, code is modular and effecient!
- presentation of your program (gui / web interface)
    - 2 marks - Your program displays an output of the result of the user's request
    - 2 marks - The program includes a button to initiate the virtual assistant

- Your program has a nice design interface:
    - 0 marks No Styling Applied,
    - 2 marks Some Styling Applied,
    - 5 marks excellent Styling.
- Included features:
    - 2 marks Pasham can tell a joke,
    - 2 marks Pasham tells the weather in London,
    - 2 marks Pasham reads the list of recipes and selects a random choice, listing ingredients and steps, 
    - 2 marks Pasham correctly answers the question about coffee.
    - 2 marks Pasham sings happy birthday 
    - 10 marks - The program can detect the words "Hey Pasham!" and automatically initiates without a button press
    - 10 marks Pasham can also understand questions in one other language.
** There are a total of 43 possible marks here **

## Peer Grading 40%

Your peers will rank their favourite submissions in order. How much you recieve in points will be based on how many submissions there are.
***If*** there are **10 submissions** there are a total of **9 potential marks**. ***If there are 15 submissions, there are 14 potential marks***.

Participants will not be able to see who is part of each group. Only your teachers can see this and as such students will not know who the video presentation belongs to.

## Final grading

```python
teacher_grade = int(input("enter teacher grade"))
peer_grade = int(input("enter peer grade"))
final_grade = (teacher_grade * 0.6) + (peer_grade * 0.4)

```
# Guides
- [How to set up VS code Studio](https://youtu.be/v5eRARe5PVE)
- [How to download github repo to VS Code Studio](https://youtu.be/30OY8aeaFaQ) **Rookie Mistake by me!** You must install [Git](https://git-scm.com/downloads) first before this video
- [What are branches and merging + how to create them](https://www.youtube.com/watch?v=S7TbHDN8EXA)
- [Guide to creating GUI using GUIZERO](https://bethsgrammarschool-my.sharepoint.com/:b:/g/personal/mrmulla_beths_bexley_sch_uk/EVHoCYDrVIFLuyjzbZr6fs4BdA-n75G3o-xkWu2DpDeA5w?e=eBPrhM)
- [Guide to creating GUI using Tkinter](https://bethsgrammarschool-my.sharepoint.com/:b:/g/personal/mrmulla_beths_bexley_sch_uk/EQw8JeBlZ51KgXpNm_wxrg0BGIi29lVrx5AlCur_jjBlng?e=LMzso0)

## Translation help 😜
[Google Translate](https://github.com/dwyl/english-words)
[Translate in Bulk using Python](https://replit.com/@bitFez/Google-translate#main.py)

## Text to Speech Help 🙏
- [pyttsx](https://pypi.org/project/pyttsx3/) Text to Speech (TTS) library for Python 2 and 3. Works without internet connection or delay. Supports multiple TTS engines, including Sapi5, nsss, and espeak.
- [gTTS](https://pypi.org/project/gTTS/) Another Text to Speech library to interface with Google Translate text-to-speech API
- [Python Speech_recognition](https://pypi.org/project/SpeechRecognition/) does what it says!
