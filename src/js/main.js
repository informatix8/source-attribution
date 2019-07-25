import merge from 'lodash.merge';

class SourceAttribution {

    /**
     @class SourceAttribution
     @summary TODO
     @param {Object} options - Supplied configuration
     @param {Object} [options.callbacks] - User supplied functions to execute at given stages of the component lifecycle
     @param {Function} options.callbacks.preCreate
     @param {Function} options.callbacks.postCreate
     */

    constructor(options) {
        if (options === undefined) {
            options = {};
        }

        const defaults = {};

        defaults.TODO = null;

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
}

export default SourceAttribution;
