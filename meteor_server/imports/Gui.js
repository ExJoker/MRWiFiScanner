import dat from '/imports/libs/datgui/DAT.GUI.min';

class Gui extends dat.GUI {
  constructor() {
    super();
    this._elems = [];
  }

  clear() {
    this._elems.forEach(function (elem) {
      this.remove(elem);
    });
  }

  addWiFiLocation(element) {
    let data = element.data;
    let f = this.addFolder(element.docId);
    this._elems.push(f);
    let networks = f.add(data.networks, "length").name("networks");
    this._elems.push(networks);
    let self = this;
    data.networks.forEach(function (network) {
      let n = f.addFolder(network.mac);
      self._elems.push(n.add(network, "ssid").name("SSID"));
      self._elems.push(n.add(network, "db").name("db"));
      self._elems.push(n);
    });
  }
}

export { Gui };
