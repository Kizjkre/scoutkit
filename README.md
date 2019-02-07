# ScoutKit
A generic scouting app for FRC.

Created by [Tristan Peng](https://www.github.com/theamazingness) and maintained by [Dylan Smith](https://www.github.com/sd554) of [Team 1540 the Flaming Chickens](https://www.github.com/flamingchickens1540).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). See `React-README.md` for more information.

## Setup
### Make the App
To make the app, first you need an `app.json` file with the app. There are many different options you can have in the `app.json` file.
1. The first key-value pair you need is the name of the app, like so:
   `"name": "My Scouting App"`.
2. You also need to decide whether or not you want the 'console' on the bottom. The console shows the match number, the alliance, and team that you are scouting. to enable it, have this field:
   `"console": true`
3. You then need to identify the export location. Do this:
   `"export": "/foo/bar/"`
4. Now, for the actual app part, you need an object with a key called app, like so:
   `"app": {}`
5. Here is the basic app layout:
````
   App
   |-- Section 1
   |     |-- Module 1
   |     |     |-- Module name/info
   |     |-- Module 2
   |     |     |-- Module name/info
   |     |-- Module 3
   |     |     |-- Module name/info
   |-- Section 2
   |     |-- Module 1
   |     |     |-- Module name/info
   |     |-- Module 2
   |     |     |-- Module name/info
   |     |-- Module 3
   |     |     |-- Module name/info
````
- Each section is its own JSON object, with the displayed name as the key and modules inside the object.
- Each module is its own JSON object, with the displayed name as the key and other relevant information inside the object.
- Every module has its own set of required fields. Here is a list of all of the modules:
	1. Checkbox
	2. Counter
	3. Input
	4. Radio
	5. Stopwatch
	6. Textarea

### Modules
#### `"type": "checkbox"`
`"options"` is an object containing all of the options for the checkbox. Inside options are objects representing options for the user.

**Example:** `"options": { "Choice 1": { "value": true }, "Choice 2": { "value": false } }`
<br><br>
#### `"type": "counter"`
`"options"` is an object containing the value to increment/decrement.

**Example:** `"options": { "increment": 1 }`
<br><br>
#### `"type": "input"`
`"options"` is an object containing the text of the placeholder

**Example:** `"options": { "placeholder": "Hello World!" }`
<br><br>
#### `"type": "radio"`
`"options"` is an object containing all of the options for the radio. Inside options are objects representing options for the user.

**Example:** `"options": { "Choice 1": { "value": true }, "Choice 2": { "value": false } }`
<br><br>
#### `"type": "stopwatch"`
<br><br>
#### `"type": "textarea"`
`"options"` is an object containing the text of the placeholder

**Example:** `"options": { "placeholder": "Hello World!" }`
<br><br>
### Upload the App
Use the file `<input>`s to upload the corresponding files.

### Upload the Schedule
To upload the schedule, close this modal and upload the schedule. the schedule can be found on The Blue Alliance's website. To make a schedule:
1. Copy and paste the table into regexr.com, then apply this RegEx to the copied text:
<br>`/Quals\s(\d+)\n(\d+)[^.](\d+)[^.](\d+)[^.](\d+)[^.](\d+)[^.](\d+)/g`
2. Now replace with: 
<br>`"$1": ["$2", "$3", "$4", "$5", "$6", "$7"],`
3. Copy the result into a text editor, add a `{` at the beginning and a `}` at the end and delete the last comma.
Save the `.json` file and upload.

### Reload
Once you upload all the necessary files, click the reload button.