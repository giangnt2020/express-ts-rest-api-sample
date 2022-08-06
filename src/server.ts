import App from "@/app";
import AuthRoute from "@routes/auth.route";
import IndexRoute from "@routes/index.route";
import UsersRoute from "@routes/users.route";
import validateEnv from "@utils/validateEnv";
import ActorsRoute from "./routes/actors.route";
import MoviesRoute from "./routes/movies.route";

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new ActorsRoute(), new MoviesRoute(), new AuthRoute()]);

app.listen();
