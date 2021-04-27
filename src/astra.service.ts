import { Inject, Injectable } from "@nestjs/common";
import { CLIENT_OPTIONS, DATASTAX_CLIENT } from "./constants";
import { AstraClientConfig } from "./interfaces/astra-client-config.interface";
import { from, Observable } from "rxjs";

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
  /**
   * Gets a document from a collection by its ID.
   * @param id ID of the document, that should be retrieved
   * @returns
   */
  public get(id: string): Observable<any> {
    const response = this.collection.get(id);
    return from(response);
  }

  /**
   * Creates a new Document
   * @param document The document that should be created
   * @param id The desired ID
   * @returns
   */
  public create<T>(document: T, id?: string): Observable<any> {
    const user = this.collection.create(id, document);
    return from(user);
  }

  /**
   * Search a collection
   * @param query The query for searching the collection
   * @param options Possible searchoptions
   * @returns
   */
  public find(query: any, options?: any): Observable<any> {
    const result = this.collection.find(query, options);
    return from(result);
  }

  /**
   * Find a single document
   * @param query The query for searching the collection
   * @param options Possible searchoptions
   * @returns
   */
  public findOne(query: any, options?: any): Observable<any> {
    const result = this.collection.findOne(query, options);
    return from(result);
  }

  /**
   * Partially update a existing document
   * @param path Path to document, may also be path to a subdocument
   * @param document Document with which the existing should be updated
   * @returns
   */
  public update<T>(path: string, document: any): Observable<any> {
    const result = this.collection.update(path, document);
    return from(result);
  }

  /**
   *
   * @param path Path to document, that should be replaced
   * @param document Document with which the specified docuent should be updated
   * @returns
   */
  public replace<T>(path: string, document: T): Observable<any> {
    const result = this.collection.replace(path, document);
    return from(result);
  }

  /**
   *
   * @param path Path to document, that should be deleted
   * @returns
   */
  public delete(path: string): Observable<any> {
    const result = this.collection.delete(path);
    return from(result);
  }
}
