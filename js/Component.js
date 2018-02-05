//https://css-tricks.com/reactive-uis-vanillajs-part-2-class-based-components/

// this is a little awkward but works for now
document.componentRegistry = { };
document.nextId = 0;

export default class Component {
  constructor(props) {
    this.props = props;
    this._id = ++document.nextId;
    document.componentRegistry[this._id] = this;
  }
}

