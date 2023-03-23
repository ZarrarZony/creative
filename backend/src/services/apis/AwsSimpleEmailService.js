import _ from "lodash";
import sesPkg from "@aws-sdk/client-sesv2";
const { SESv2Client, SendEmailCommand } = sesPkg;

let container;

class AwsSimpleEmailService {
  #apiCredentials = new Map();

  init = (apis) => {
    //removed
  };

  async sendEmail(serviceName, { from, to, htmlTemplate }) {
    console.log("Sending email from: AWS SES");

    const client = this.#apiCredentials.get(serviceName);

    const input = {
      Destination: {
        ToAddresses: to,
      },
      Content: {
        Simple: {
          Body: {
            Html: {
              Data: htmlTemplate.content,
            },
          },
          Subject: {
            Data: htmlTemplate.subject,
          },
        },
      },
      FromEmailAddress: from.email,
    };

    const command = new SendEmailCommand(input);
    const response = await client.send(command);

    return response;
  }
}

/** @returns {AwsSimpleEmailService} */
const initService = () => {
  if (!container) {
    container = new AwsSimpleEmailService();
  }

  return container;
};

export default initService();
