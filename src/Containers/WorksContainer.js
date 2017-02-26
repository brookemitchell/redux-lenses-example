import R from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getWorks, setEditing } from "../redux/modules/state";
import { Table, Column, Cell } from "fixed-data-table";
import { titleCase } from "change-case";
import "../../node_modules/fixed-data-table/dist/fixed-data-table.css";

class Works extends Component {
  constructor() {
    super();
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  componentDidMount() {
    this.props.getWorks();
  }

  handleEditClick({ target }) {
    const [id, key] = target.className.split(" ");
    this.props.setEditing({ [id]: key });
  }

  render() {
    const entries = Object.values(this.props.works);

    const cellCreator = key => props => {
      const index = props.rowIndex;
      return (
        <Cell {...props}>

          {/* <input type="text" value={entries[props.rowIndex][key]} /> */}
          <div
            onDoubleClick={this.handleEditClick}
            className={`${entries[index]["id"]} ${key}`}
            style={{ overflow: "auto" }}
          >
            {entries[index][key]}
          </div>

        </Cell>
      );
    };

    const infoCol = (val, key, o) => (
      <Column
        width={key === "description" ? 500 : 200}
        allowCellsRecycling={true}
        key={key + o.id}
        columnKey={key + o.id}
        header={<Cell>{titleCase(key)}</Cell>}
        cell={cellCreator(key)}
      />
    );

    const desc = R.compose(
      R.mapObjIndexed(infoCol),
      R.omit(["geometry", "code"])
    )(entries[0]);

    return (
      <Table
        /* onRowDoubleClick={(...args) => console.log(args)}*/
        rowsCount={entries.length}
        rowHeight={130}
        width={window.innerWidth}
        height={window.innerHeight}
        headerHeight={50}
      >
        {Object.values(desc)}
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  works: state.works.works
});

const mapDispatchToProps = { getWorks, setEditing };

export default connect(mapStateToProps, mapDispatchToProps)(Works);
