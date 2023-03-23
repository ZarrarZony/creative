import _ from "lodash";
import cors from "cors";
import helmet from "helmet";
import crypto from "crypto";
import express from "express";
import bodyParser from "body-parser";
import { createComponentsApiRoutes } from "./components/index.js";

const { GeneralError } = Errors;

const helmetMiddleware = (request, response, next) => {
  const nonce = crypto.randomBytes(16).toString("hex");
  //removed
  request.app.nonce = nonce;
  helmet({
    contentSecurityPolicy: { directives: contentSecurityPolicyDirectives },
  })(request, response, next);
};

const generateApiRoutes = () => {
  //removed
};

const generateApiResponses = () => {
  const router = express.Router();
  router.all("*", (request, response, next) => {
    const preMadeResponse = request.preMadeResponse || {};
    switch (preMadeResponse.type) {
      case "html":
        return response.render(
          preMadeResponse.view,
          preMadeResponse.dataForHtml ?? []
        );
      case "json":
      //removed
      case "image/gif": {
        const image = Buffer.from(preMadeResponse.responseObj, "base64");
        return response
          .writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": image.length,
          })
          .end(image);
      }
      default:
        return console.error(
          `The response of '${request.path}' is not set up correctly.`
        );
    }
  });
  return router;
};

const errorsMiddleware = async (error, request, response, next) => {
  const { userId, username } = request?.auth ?? {};
  const err =
    error instanceof GeneralError
      ? error
      : new GeneralError({
          message: error?.message ?? "Unknown error",
          stack: error.stack,
        });
  const errorDetails = err.getErrorDetails();
  if (err.logError) {
    err.status = errorDetails.status;
    err.extraDetails = errorDetails.extraDetails;
    err.labels = _.merge(err.labels, { userId, username });
    const apmErrorId = await apm.logError(err);
    response.set("apm-transaction-id", apmErrorId);
  }
  response
    .status(errorDetails.status || 500)
    .json({ success: false, message: errorDetails.message });
};

const initApp = async () => {
  const app = express();
  const jsonBodyParser = bodyParser.json({ limit: "50mb" });
  const textBodyParser = bodyParser.text({ limit: "50mb" });
  //removed
  //removed
  //removed
  //removed
  //removed
  //removed
  //removed
  app.use(
    "/",
    jsonBodyParser,
    urlEncodedParser,
    OidcProviderService.getOidcInteractionRoutes()
  );
  app.use(errorsMiddleware);

  return app;
};

export { initApp };
