# How to run the project in local

## FE

In the project directory, you can run:

### `npm install`

### `npm start`

## BE

Create gradientAccessKey and workspaceId from 'https://auth.gradient.ai/select-workspace' website. They have $10 free credits.

Add in the place of your-id & your-workspace-id in 'trainBot.js' and 'getAnswer.js' files

Then, run the following command to install dependencies.

### `npm install`

Finally run the server by running the following command.

### `npm start`

You will have a NodeJS server running at `http://localhost:3000`.

## Train the model

First, add some training data into the `training-data.txt` file. Then, hit the following endpoint to train the model.

```bash
curl -X GET http://localhost:3000/train-bot
```

## Ask a question

```bash
curl -X POST -H "Content-Type: application/json" -d '{"question": "YOUR_QUESTION_HERE"}' http://localhost:3000/get-answer
```

And wait for the answer!

Now you have a custom chatbot that can answer your questions. You can add more training data to make it more accurate and relevant!
