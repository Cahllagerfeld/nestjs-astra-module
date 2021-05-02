import { Inject, Injectable } from '@nestjs/common';
import { CLIENT_OPTIONS, DATASTAX_CLIENT } from './constants';
import { AstraClientConfig } from './interfaces/astra-client-config.interface';
import { from, Observable } from 'rxjs';
import { documentId } from './interfaces/documentId.interface';
import { findResult } from './interfaces/findResult.interface';

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
  public create<T>(document: T, id?: string): Observable<documentId | null> {
    let promise: Promise<documentId | null>;
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
  public find<T>(query?: any, options?: any): Observable<findResult<T> | null> {
    const promise: Promise<findResult<T> | null> = this.collection.find(
      query,
      options,
    );
    return from(promise);
  }

  /**
   * Find a single document
   * @param query The query for searching the collection
   * @param options Possible searchoptions
   * @returns
   */
  public findOne<T>(query: any, options?: any): Observable<T | null> {
    const promise: Promise<T | null> = this.collection.findOne(query, options);
    return from(promise);
  }

  /**
   * Partially update a existing document
   * @param path Path to document, may also be path to a subdocument
   * @param document Document with which the existing should be updated
   * @returns
   */
  public update<T>(path: string, document: T): Observable<documentId | null> {
    const promise: Promise<documentId | null> = this.collection.update(
      path,
      document,
    );
    return from(promise);
  }

  /**
   *
   * @param path Path to document, that should be replaced
   * @param document Document with which the specified docuent should be updated
   * @returns
   */
  public replace<T>(path: string, document: T): Observable<documentId | null> {
    const promise: Promise<documentId | null> = this.collection.replace(
      path,
      document,
    );
    return from(promise);
  }

  /**
   *
   * @param path Path to document, that should be deleted
   * @returns
   */
  public delete(path: string): Observable<null> {
    const promise: Promise<null> = this.collection.delete(path);
    return from(promise);
  }
}
