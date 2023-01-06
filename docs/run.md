# How to run

## Requirements

- Python 3.11
- Pip
- virtualenv (optional but highly recommended)
- Google Chrome

## Steps

1. Download `pasham.zip` from [releases](https://github.com/BethsGrammar/22-23_computing_competition-cr00sing/releases/latest) and extract it

   - Alternately clone the repository. `pasham.zip` is just the `src` folder of the repository with everything not necessary for running the application taken out

2. Open the folder you just extracted in a shell/command line of you choice.

   - The next step involves installing many dependencies. I highly recommend that you make a virtual environment at this point and enter it to install the dependencies and keep you base python clean
   - If you don't have virtualenv installed, install it by running `pip install virtualenv`
   - Create a virtual environment by running `virtualenv venv`
   - Activate the virtual environment by running

   ```
   # Windows
   .\venv\Scripts\activate

   # MacOS / Linux (Bash)
   source venv/bin/activate
   ```

3. Install the dependencies by running `pip install -r requirements.txt`

4. Run main.py by running `python main.py`

5. The application will open in your default web browser. **If your default web browser isn't Google Chrome** copy the URL from the browser that is opened and open that URL in **Google Chrome**. The app should be hosted at `http://127.0.0.1:1002/pasham/`

## Troubleshooting

- If you run `python main.py` and your browser opens to an error/there is an error when navigating to the correct address there are a few steps you can take
  - Stops any applications that are hosting at local host
  - If you are using Mac OS or Linux try running the application as a superuser `sudo python main.py`
- If you get error codes from within the application itself check that main.py is still running
