import { SettingsService } from "./settings.service";
describe('SettingsService', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should load lb when lb is stored', () => {
        localStorage.setItem('weight-unit', 'lb');
        const service = new SettingsService();

        expect(service.currentUnit()).toEqual('lb');
    });

    it('should default lb when nothing in storage', () => {
        const service = new SettingsService();

        expect(service.currentUnit()).toEqual('lb');
    })

    it('should save the unit to storage when set default unit is called', () => {
        const service = new SettingsService();
        service.setDefaultUnit('kg');

        expect(localStorage.getItem('weight-unit')).toEqual('kg');
    });

    it('should set the current unit to what was stored in storage', () => {
        localStorage.setItem('weight-unit', 'kg');
        const service = new SettingsService();

        expect(service.currentUnit()).toEqual('kg');
    })

    it('should fall back to lb if invalid weight unit stored', () => {
        localStorage.setItem('weight-unit', 'stone');
        const service = new SettingsService();

        expect(service.currentUnit()).toEqual('lb');
    })

    it('should change current unit when set default unit called', () => {
        localStorage.setItem('weight-unit', 'lb');
        const service = new SettingsService();
        service.setDefaultUnit('kg');

        expect(service.currentUnit()).toEqual('kg');
    })

    it('should load the saved unit in a new service after set default unit', () => {
        const firstService = new SettingsService();
        firstService.setDefaultUnit('kg');

        const secondService = new SettingsService();

        expect(secondService.currentUnit()).toEqual('kg');
    });

    it('should fall back to lb and log an error if reading from storage fails', () => {
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new Error('storage denied');
        });
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const service = new SettingsService();

        expect(service.currentUnit()).toEqual('lb');
        expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should still update the current unit and log an error if saving to storage fails', () => {
        jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new Error('storage denied');
        });
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const service = new SettingsService();

        expect(() => service.setDefaultUnit('kg')).not.toThrow();

        expect(service.currentUnit()).toEqual('kg');
        expect(consoleErrorSpy).toHaveBeenCalled();
    });
});
