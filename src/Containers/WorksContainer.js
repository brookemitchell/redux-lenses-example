import R from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getWorks } from "../redux/modules/state";
import { Table, Column, Cell } from "fixed-data-table";
import { titleCase } from "change-case";
import css from "../../node_modules/fixed-data-table/dist/fixed-data-table.css";

class Works extends Component {
  componentDidMount() {
    this.props.getWorks();
  }

  render() {
    const entries = Object.values(this.props.works);

    const infoCol = (val, key, o) => (
      <Column
        width={200}
        allowCellsRecycling={true}
        key={key + o.id}
        columnKey={key + o.id}
        header={<Cell>{titleCase(key)}</Cell>}
        cell={props => (
          <Cell {...props} style={{overflow: 'auto'}} >
            {/* <input type="text" value={entries[props.rowIndex][key]} /> */}
            {entries[props.rowIndex][key]}
          </Cell>
        )}
      />
    );

    const desc = R.compose(
      R.mapObjIndexed(infoCol),
      R.omit(["geometry", "code"])
    )(entries[0]);

    return (
      <Table
        rowsCount={entries.length}
        rowHeight={150}
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

const mapDispatchToProps = { getWorks };

export default connect(mapStateToProps, mapDispatchToProps)(Works);
