import merge from 'lodash.merge';

class SourceAttribution {

    /**
     @class SourceAttribution
     @summary Copy/paste source attribution
     @param {Object} options - Supplied configuration
     @param {Object} [options.callbacks] - User supplied functions to execute at given stages of the component lifecycle
     @param {Function} options.callbacks.preCreate
     @param {Function} options.callbacks.postCreate
     @param {Function} options.callbacks.preDestroy
     @param {Function} options.callbacks.postDestroy
     */

    constructor(options) {
        if (options === undefined) {
            options = {};
        }

        const defaults = {};

        defaults.copyCategory = 'engagement';
        defaults.copyEvent = 'copy';
        defaults.productName = 'Product Name TBD';

        //put supplied options on top of defaults
        merge(this, defaults, options);

        this.callCustom('preCreate');

        const destroyFn = this.destroy.bind(this);

        window.addEventListener('unload', destroyFn);

        this.callCustom('postCreate');
    }

    /**
     * @method destroy
     * @memberOf SourceAttribution
     * @instance
     * @summary Destroy
     * @private
     */
    destroy() {
        this.callCustom('preDestroy');
        //TODO
        this.callCustom('postDestroy');
    }

    /**
     * @method callCustom
     * @memberOf SourceAttribution
     * @instance
     * @summary execute an implementation defined callback on a certain action
     * @private
     */
    callCustom(userFn) {
        const sliced = Array.prototype.slice.call(arguments, 1);

        if (this.callbacks !== undefined && this.callbacks[userFn] !== undefined && typeof this.callbacks[userFn] === 'function') {
            this.callbacks[userFn].apply(this, sliced);
        }
    }

    /**
     * @method trackEventGA
     * @memberOf SourceAttribution
     * @instance
     * @summary standard function interface for different Google Analytics implementations
     * @private
     */
    trackEventGA (category, action, label, value) {
        if (value === undefined) {
            value = 0;
        }

        if (typeof (window._gaq) !== 'undefined') {
            window._gaq.push(['_trackEvent', category, action, label, value]);
        }
        else if (typeof (window.gtag) !== 'undefined') {
            // jscs:disable
            window.gtag('event', action, {
                event_category: category, // jshint ignore:line
                event_label: label // jshint ignore:line
            });
            // jscs:enable
        }
        else if (typeof (window.ga) !== 'undefined') {
            window.ga('send', 'event', category, action, label, value);
        }
    }
}

export default SourceAttribution;
