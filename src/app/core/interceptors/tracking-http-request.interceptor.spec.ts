import { TestBed } from '@angular/core/testing';

import { TrackingHttpRequestInterceptor } from './tracking-http-request.interceptor';

describe('TrackingHttpRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TrackingHttpRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TrackingHttpRequestInterceptor = TestBed.inject(TrackingHttpRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
