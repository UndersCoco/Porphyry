import React, { Component } from 'react';
import by from 'sort-by';
import { Link } from 'react-router-dom';
import ItemCreator from './ItemCreator.jsx';
import Portfolio from './Portfolio.jsx';

class Corpora extends Component {

  render() {
    let items = this._getItems();
    let options = this._getOptions();
    //let sort = this._sortByAttribute;
    let count = this.props.items.length;
    let total = this.props.from;
    let listIds = this.props.ids.map((corpus) =>
      <div key={corpus}>{corpus} <ItemCreator corpus={corpus} conf={this.props.conf} /></div>
    );
    return (
      <div className="col-md-8 p-4">
        <div className="Subject">
          <h2 className="h4 font-weight-bold text-center">
            {listIds}
            <span className="badge badge-pill badge-light ml-4">{count} / {total}</span>
          </h2>
          {/*this._sortByAttribute(this.props.items)*/}
          <select id="attribut" onChange={this.props.portfolio.render}>
            {options}
          </select>
          <div className="Items m-3">
            {items}
          </div>
        </div>
      </div>
    );
  }

  _getItems() {
    return this.props.items.map(item =>
      <Item key={item.id} item={item} />
    );
  }

  _getOptions() {
    let arr = [];
    for (var i = 0; i < this.props.items.length; i++) {
      let keys = Object.keys(this.props.items[i]);
      for (var j = 0; j < keys.length; j++) {
        if (!arr.concat(['couchapp', 'topic', 'corpus', 'id']).includes(keys[j])) {
          arr.push(keys[j]);
        }
      }
    }
    return arr.map(attribute =>
      <option value={attribute}> {attribute} </option>
    );
  }

  _sortByAttribute = items => e => {
    let select = document.getElementById('attribut');
    let attribut = select.options[select.selectedIndex].value;
    this.setState({items: items.sort(by(attribut))});
  }

}

function Item(props) {
  let uri = `/item/${props.item.corpus}/${props.item.id}`;
  let thumbnail = props.item.thumbnail;
  let name = [props.item.name].join(', '); //Name can be an array
  if (thumbnail) return (
    <div className="Item">
      <Link to={uri}>
        <img src={thumbnail} alt={name}/>
      </Link>
      <div className="text-center">{name}</div>
    </div>
  );
  return (
    <div className="Item">
      <Link to={uri}>
        {name}
      </Link>
    </div>
  );
}

export default Corpora;
