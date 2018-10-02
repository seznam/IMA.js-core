import PageNavigationHandler from 'page/handler/PageNavigationHandler';
import Window from 'window/Window';
import { ActionTypes } from 'router/ClientRouter';

jest.useFakeTimers();

describe('ima.page.handler.PageNavigationHandler', () => {
  let handler;
  let window;

  beforeEach(() => {
    window = new Window();
    spyOn(window, 'getWindow').and.returnValue({
      history: { scrollRestoration: 'auto' }
    });

    handler = new PageNavigationHandler(window);
    handler.init();
  });

  afterEach(() => {
    handler.destroy();
  });

  describe('constructor()', () => {
    it("should set 'scrollRestoration' property to 'manual'", () => {
      const browserWindow = window.getWindow();
      expect(browserWindow.history.scrollRestoration).toBe('manual');
    });
  });

  describe('handlePreManagedState() method', () => {
    it('should call window.replaceState and then window.pushState method', () => {
      const replaceStateMock = spyOn(window, 'replaceState');
      const pushStateMock = spyOn(window, 'pushState').and.stub();

      handler.handlePreManagedState({}, {}, { url: 'http://localhost/' });

      expect(replaceStateMock).toHaveBeenCalled();
      expect(pushStateMock).toHaveBeenCalled();
    });

    it('should not call window.pushState after loading page because url is set alright from browser', () => {
      const replaceStateMock = spyOn(window, 'replaceState');
      const pushStateMock = spyOn(window, 'pushState').and.stub();

      handler.handlePreManagedState(null, {}, { url: 'http://localhost/' });

      expect(replaceStateMock).not.toHaveBeenCalled();
      expect(pushStateMock).not.toHaveBeenCalled();
    });

    it('should not call window.pushState after POP_STATE action because url is set alright from browser', () => {
      const replaceStateMock = spyOn(window, 'replaceState');
      const pushStateMock = spyOn(window, 'pushState').and.stub();

      handler.handlePreManagedState(
        null,
        {},
        { url: 'http://localhost/', action: ActionTypes.POP_STATE }
      );

      expect(replaceStateMock).not.toHaveBeenCalled();
      expect(pushStateMock).not.toHaveBeenCalled();
    });
  });

  describe('handlePostManagedState() method', () => {
    it('should call window.scrollTo method', () => {
      spyOn(window, 'scrollTo').and.stub();

      const scroll = { x: 0, y: 340 };

      handler.handlePostManagedState(null, null, {
        event: { state: { scroll } }
      });

      jest.runAllTimers();
      expect(window.scrollTo).toHaveBeenCalledWith(scroll.x, scroll.y);
    });

    it('should scroll to the top of page for undefined scroll position', () => {
      spyOn(window, 'scrollTo').and.stub();

      const scroll = { x: 0, y: 0 };

      handler.handlePostManagedState(null, null, {});

      jest.runAllTimers();
      expect(window.scrollTo).toHaveBeenCalledWith(scroll.x, scroll.y);
    });
  });
});
