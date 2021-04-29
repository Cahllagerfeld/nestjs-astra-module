import { Inject, Injectable } from '@nestjs/common';
import { CLIENT_OPTIONS, DATASTAX_CLIENT } from './constants';
import { AstraClientConfig } from './interfaces/astra-client-config.interface';
import { from, Observable } from 'rxjs';
import { createDocument } from './interfaces/createDocument.interface';

@Injectable()
export class AstraService {
  private collection: any;
  constructor(
    @Inject(CLIENT_OPTIONS) private readonly options: AstraClientConfig,
    @Inject(DATASTAX_CLIENT) private readonly client: any,
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
  public get<T>(id: string): Observable<T> {
    const response: Promise<T> = this.collection.get(id);
    return from(response);
  }

  /**
   * Creates a new Document
   * @param document The document that should be created
   * @param id The desired ID
   * @returns document ID of created document
   */
  public create<T>(document: T, id?: string): Observable<createDocument> {
    let promise: Promise<createDocument>;
    if (!id) {
      promise = this.collection.create(document);
      return from(promise);
    }
    promise = this.collection.create(id, document);
    return from(promise);
  }

  /**
   * Search a collection
   * @param query The query for searching the collection
   * @param options Possible searchoptions
   * @returns
   */
  public find(query?: any, options?: any): Observable<any> {
    return from(this.collection.find(query, options));
  }

  /**
   * Find a single document
   * @param query The query for searching the collection
   * @param options Possible searchoptions
   * @returns
   */
  public findOne(query: any, options?: any): Observable<any> {
    return from(this.collection.findOne(query, options));
  }

  /**
   * Partially update a existing document
   * @param path Path to document, may also be path to a subdocument
   * @param document Document with which the existing should be updated
   * @returns
   */
  public update<T>(path: string, document: T): Observable<any> {
    return from(this.collection.update(path, document));
  }

  /**
   *
   * @param path Path to document, that should be replaced
   * @param document Document with which the specified docuent should be updated
   * @returns
   */
  public replace<T>(path: string, document: T): Observable<any> {
    return from(this.collection.replace(path, document));
  }

  /**
   *
   * @param path Path to document, that should be deleted
   * @returns
   */
  public delete(path: string): Observable<any> {
    return from(this.collection.delete(path));
  }
}
