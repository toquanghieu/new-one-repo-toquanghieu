import { generateRoutes, ExtendedRoutesConfig } from "tsoa";

(async () => {
  const routeOptions: ExtendedRoutesConfig = {
    entryFile: "src/index.ts",
    noImplicitAdditionalProperties: "throw-on-extras",
    routesDir: "src/infrastructure/express",
    controllerPathGlobs: ["src/controllers/**/*.controller.ts"],
    iocModule: "src/middlewares/inversify/ioc.ts",
  };

  await Promise.all([generateRoutes(routeOptions)]);
})();
