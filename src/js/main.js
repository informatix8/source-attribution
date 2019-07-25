import merge from 'lodash.merge';

class SourceAttribution {

    /**
     @class SourceAttribution
     @summary Copy/paste source attribution
     @param {Object} options - Supplied configuration
     @param {String} [options.productName] - The name of the product you wish to attribute the copied text to **Required**
     @param {String} [options.copyCategory="engagement"] - The Google Analytics category name
     @param {String} [options.copyEvent="copy"] - The Google Analytics event name
     @param {String} [options.minimumSelectionLength=25] -  More than this amount of characters copied adds the attribution suffix to the clipboard
     @param {String} [options.copySuffix="\n\nCopied from...\nRead more...\n"] - The text to place after the copied text
     @param {Object} [options.callbacks] - User supplied functions to execute at given stages of the component lifecycle
     @param {Function} options.callbacks.preCreate
     @param {Function} options.callbacks.postCreate
     @param {Function} options.callbacks.preCopy
     @param {Function} options.callbacks.postCopy
     @param {Function} options.callbacks.preDestroy
     @param {Function} options.callbacks.postDestroy
     */

    constructor (options) {
        if (options === undefined) {
            options = {};
        }

        const defaults = {};

        //User supplied productName is required
        if (options.productName === undefined || options.productName === null) {
            throw 'SourceAttribution you must supply a productName';
        }

        defaults.copyCategory = 'engagement';
        defaults.copyEvent = 'copy';
        defaults.minimumSelectionLength = 25;
        defaults.copySuffix = '\n\n' +
        'Copied from: ' + options.productName + '\n' +
        'Read more: ' + window.location.href +
        '\n';

        //put supplied options on top of defaults
        merge(this, defaults, options);

        this.callCustom('preCreate');

        this.copyFn = this.copy.bind(this);
        const destroyFn = this.destroy.bind(this);

        document.body.addEventListener('copy', this.copyFn);
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
    destroy () {
        this.callCustom('preDestroy');
        if (this.copyFn !== null) {
            document.body.removeEventListener('copy', this.copyFn);
            this.copyFn = null;
        }
        this.callCustom('postDestroy');
    }

    /**
     * @method callCustom
     * @memberOf SourceAttribution
     * @instance
     * @summary execute an implementation defined callback on a certain action
     * @private
     */
    callCustom (userFn) {
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

    /**
     * @method copy
     * @memberOf SourceAttribution
     * @instance
     * @summary Copy event listener
     * @private
     */
    copy (event) {
        this.callCustom('preCopy');
        var selection = document.getSelection();

        this.trackEventGA(this.copyCategory, this.copyEvent + '_url', window.location.href);
        this.trackEventGA(this.copyCategory, this.copyEvent + '_selection', selection);

        if (selection.toString().length > this.minimumSelectionLength) {
            var trimmed = selection.toString().replace(/^\s+|\s+$/g, '');
            event.clipboardData.setData('text/plain', '"' + trimmed + '"' + this.copySuffix);
            event.preventDefault();
        }
        this.callCustom('postCopy');
    }
}

export default SourceAttribution;
