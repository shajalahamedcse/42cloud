import React from 'react';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';
import { selectKeypairs } from 'app/selectors/nova';
import { KEYPAIR_TABLE_COLUMN, KEYPAIR_FIELD } from 'features/common/constants';
import commonStyles from 'features/common/styles.css';

class KeypairTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.keypairs.loading) {
      return (
        <div
          style={{
            'textAlign': 'center'
          }}
        >
          <Spin />
        </div>
      )
    } else {
      let columns = [];
      KEYPAIR_TABLE_COLUMN.forEach((title) => {
        let sorter;
        if (title === 'name') {
          sorter = (a, b) => a.name.length - b.name.length;
        }

        columns.push({
          title: KEYPAIR_FIELD[title],
          key: title,
          dataIndex: title,
          sorter: sorter
        })
      });

      let data = [];
      this.props.keypairs.data.forEach((ele) => {
        data.push(ele.keypair);
      });

      return (
        <div className={commonStyles.wrapper}>
          <Table
            columns={columns}
            bordered
            size="middle"
            dataSource={data}
            rowKey='name'
          />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  keypairs: selectKeypairs(state)
});
export default connect(mapStateToProps, null)(KeypairTable);