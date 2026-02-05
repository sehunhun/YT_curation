/**
 * Google API 클라이언트 타입 정의
 */

declare namespace gapi {
  namespace client {
    function setApiKey(apiKey: string): void;
    function load(apiUrl: string, version?: string): Promise<void>;
    
    namespace youtube {
      namespace channels {
        interface ListParams {
          part: string[];
          id?: string[];
        }

        interface ListResponse {
          result: any;
        }

        function list(params: ListParams): {
          then<TResult1 = ListResponse, TResult2 = never>(
            onfulfilled?: ((value: ListResponse) => TResult1 | PromiseLike<TResult1>) | undefined | null,
            onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
          ): Promise<TResult1 | TResult2>;
        };
      }
    }
  }

  function load(apis: string, callback: () => void): void;
}
