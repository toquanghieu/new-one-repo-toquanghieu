import { Container, decorate, injectable } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { Controller } from "tsoa";
import { DataSource, Repository } from "typeorm";

const iocContainer = new Container({skipBaseClassChecks: true, autoBindInjectable: true});

decorate(injectable(), Controller);
decorate(injectable(), DataSource);
decorate(injectable(), Repository);
iocContainer.load(buildProviderModule());

export { iocContainer };
