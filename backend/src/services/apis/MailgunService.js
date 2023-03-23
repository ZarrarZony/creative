import _ from "lodash";
import Mailgun from "mailgun-js";

let container;

class MailgunService {
  #apiCredentials = new Map();

  init = (apis) => {
    //removed
  };

  instance = (serviceName, domain) => {
    const { token } = this.#apiCredentials.get(serviceName);
    const mailgun = new Mailgun({
      apiKey: token,
      domain: `mg.${domain}`,
    });

    return mailgun;
  };

  async sendEmail(serviceName, { from, to, htmlTemplate }) {
    console.log("Sending email from: Mailgun");

    const [, domain] = _.split(from.email, "@");
    const instace = this.instance(serviceName, domain);

    to = _.join(to, ",");
    const config = {
      from: from.email,
      to,
      subject: htmlTemplate.subject,
      html: htmlTemplate.content,
    };

    const data = await instace.messages().send(config);

    return data;
  }
}

/** @returns {MailgunService} */
const initService = () => {
  if (!container) {
    container = new MailgunService();
  }

  return container;
};

export default initService();
