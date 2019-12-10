import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { Icon, Modal, DatePicker, Input, Form, Collapse, Row, Checkbox, Spin } from "antd";
import { FormComponentProps } from "antd/lib/form";
import moment from "moment";
import { gql } from "apollo-boost";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import history from "utils/history";

interface IProps extends FormComponentProps {}

interface IItem {
  id: string;
  title: string;
  expiredTime: string;
  description: string;
  checked: boolean;
}

gql`
  query todoInfo($id: ID!) {
    todoInfo(id: $id) {
      id
      title
    }
  }
`;

const todoFragment = gql`
  fragment todeMeta on todoListType {
    id
    description
    expiredTime
    checked
    title
  }
`;
const mutiTodo = gql`
  query todo($id: ID!) {
    todolist {
      ...todeMeta
    }
    todoInfo(id: $id) {
      ...todeMeta
    }
  }
  ${todoFragment}
`;

const todoListQuery = gql`
  {
    todolist {
      id
      description
      expiredTime
      checked
      title
    }
  }
`;

const updateTodo = gql`
  mutation updateTodo(
    $title: String!
    $description: String
    $id: ID!
    $expiredTime: String!
    $checked: Boolean!
  ) {
    update(
      params: {
        id: $id
        title: $title
        description: $description
        expiredTime: $expiredTime
        checked: $checked
      }
    ) {
      #   success
      id
      description
      expiredTime
      checked
      title
    }
  }
`;

const addTodo = gql`
  mutation add($title: String!, $description: String!, $expiredTime: String!) {
    add(params: { title: $title, description: $description, expiredTime: $expiredTime }) {
      id
      description
      expiredTime
      checked
      title
    }
  }
`;

const deleteTodo = gql`
  mutation delete($id: ID) {
    delete(params: { id: $id }) {
      id
      success
    }
  }
`;

function TodoLists({ form, ...props }: IProps) {
  const [show, troogleShow] = useState(false);
  const [edit, setEdit] = useState<IItem | null>(null);
  //   const [lists, changeLists] = useState<IItem[]>([]);

  const { data: queryData, loading: queryLoading, refetch } = useQuery<{ todolist: IItem }>(
    mutiTodo,
    {
      variables: { id: "8" },
      // pollInterval: 5000,
      //   errorPolicy: "all",
    }
  );

  console.log(queryData);

  const [fetchDate, { data: lazyData, loading: lazyLoading }] = useLazyQuery(todoListQuery);
  const [updateData] = useMutation(updateTodo);
  const [addData] = useMutation(addTodo, {
    update(cache, { data: { add } }) {
      const datas: any = cache.readQuery({ query: todoListQuery });
      cache.writeQuery({
        query: todoListQuery,
        data: { todolist: datas.todolist.concat([add]) },
      });
    },
  });
  const [deleteData] = useMutation<{ delete: { id: string } }, { id: string }>(deleteTodo, {
    update(cache, { data: resData }) {
      const datas: any = cache.readQuery({ query: todoListQuery });
      resData &&
        cache.writeQuery({
          query: todoListQuery,
          data: { todolist: datas.todolist.filter((_: any) => _.id !== resData.delete.id) },
        });
    },
  });

  const loading = queryLoading || lazyLoading;
  const data = queryData || lazyData;
  const lists: IItem[] = data ? data.todolist || [] : [];

  useEffect(() => {
    // fetchDate();
  }, []);

  const submit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        values.expiredTime = values.expiredTime.format("YYYY-MM-DD");
        const params: IItem = Object.assign({}, edit, values);
        console.log(params);
        edit
          ? updateData({ variables: params }).then(res => {
              setEdit(null);
            })
          : addData({ variables: params });
        troogleShow(false);
      }
    });
  };
  const header = (_: IItem) => {
    return (
      <Row type="flex" align="middle">
        <Checkbox
          checked={_.checked}
          onClick={e => {
            e.stopPropagation();
          }}
        />
        <span style={{ margin: "0 10px" }}>
          {_.title}
          <span style={{ color: "gray" }}>（{_.expiredTime}）</span>
        </span>
        <span
          className={style.icon}
          style={{ marginRight: "10px" }}
          onClick={e => {
            e.stopPropagation();
            setEdit(_);
            troogleShow(true);
          }}
        >
          <Icon type="edit" />
        </span>
        <span
          className={style.icon}
          onClick={e => {
            e.stopPropagation();
            deleteData({ variables: { id: _.id } });
          }}
        >
          <Icon type="delete" />
        </span>
      </Row>
    );
  };
  const { getFieldDecorator } = form;
  return (
    <div className={style.container}>
      {loading && (
        <div className={style.loading}>
          <Spin />
        </div>
      )}
      <div className={style.title}>
        <span
          className={style.icon}
          onClick={() => {
            history.goBack();
          }}
        >
          <Icon type="arrow-left" style={{ marginRight: "10px" }} />
        </span>
        TodoList
        <span className={style.icon} onClick={() => troogleShow(true)}>
          <Icon type="plus-circle" />
        </span>
      </div>
      <div style={{ borderBottom: "1px solid #d9d9d9", marginTop: "10px" }} />
      <Collapse
        accordion
        bordered={false}
        expandIconPosition="right"
        onChange={(key: string | string[]) => {
          //   console.log(key);
        }}
      >
        {lists.map(_ => (
          <Collapse.Panel header={header(_)} key={_.id}>
            {_.description || "-"}
          </Collapse.Panel>
        ))}
      </Collapse>
      <Modal
        visible={show}
        onCancel={() => troogleShow(false)}
        title="new list"
        destroyOnClose
        onOk={submit}
        width={550}
        maskClosable={false}
      >
        <Form
          colon={false}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18, offset: 2 }}
          labelAlign="right"
          layout="horizontal"
        >
          <Form.Item label="完成时间">
            {getFieldDecorator("expiredTime", {
              initialValue: edit ? moment(edit.expiredTime) : undefined,
              rules: [{ required: true, message: "请选择时间" }],
            })(<DatePicker />)}
          </Form.Item>
          <Form.Item label="标题">
            {getFieldDecorator("title", {
              initialValue: edit ? edit.title : "",
              rules: [{ required: true, message: "请填写标题" }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator("description", {
              initialValue: edit ? edit.description : "",
            })(<Input.TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Form.create<IProps>({})(TodoLists);
