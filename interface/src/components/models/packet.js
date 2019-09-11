/**
 * Packet model
 */
export default class Packet {

    constructor(battery, risk, raw) {
    
        this.battery = battery || 0;
        this.risk = risk || 0;
        this.raw = raw || '--';
    }
}
