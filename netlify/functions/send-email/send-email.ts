import { Handler } from '@netlify/functions'
import { SESClient, SendEmailCommand, SendEmailCommandInput} from "@aws-sdk/client-ses";

function capitalize(val: string) {
  return val[0].toUpperCase() + val.slice(1);
}

export const handler: Handler = async (event, context) => {
  const {person} = event.queryStringParameters;
  const client = new SESClient({
    region: "us-east-2", 
    credentials: {
      accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID, 
      secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
    }
  });

  const params: SendEmailCommandInput = {
    Source: "robo.jarred@gmail.com",
    Destination: {ToAddresses: ["jarred.glaser@gmail.com"]},
    Message: {
      Subject: {
        Charset: "UTF-8", 
        Data: "It's Party Time!"
      }, 
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<h1>Woo Hoo!🎉</h1><h2>${capitalize(person)} said yes to being in our wedding!</h2>`
        }
      }
    }
  };
  const command = new SendEmailCommand(params);

  try {
    const data = await client.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Email sent"
      })
    }
  } catch (error) {
    return {
      statusCode: error.$metadata.httpStatusCode,
      body: JSON.stringify({
        message: "Email failed to send"
      })
    }
  }
}
