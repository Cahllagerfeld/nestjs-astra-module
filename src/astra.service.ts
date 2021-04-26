import { Inject, Injectable } from "@nestjs/common";
import { CLIENT_OPTIONS, DATASTAX_CLIENT } from "./constants";
import { AstraClientConfig } from "./interfaces/astra-client-config.interface";

@Injectable()
export class AstraService {
  private collection: any;
  constructor(
    @Inject(CLIENT_OPTIONS) private readonly options: AstraClientConfig,
    @Inject(DATASTAX_CLIENT) private readonly client: any
  ) {
    this.collection = client
      .namespace(options.namespace)
      .collection(options.collection);
  }
}
