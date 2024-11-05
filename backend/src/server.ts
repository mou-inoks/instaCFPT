import app from "./app";
import { serverConfig } from "./config/serverConfig";

app.listen(serverConfig.port, () => {
  console.log(`Server is listening on port ${serverConfig.port}`);
});