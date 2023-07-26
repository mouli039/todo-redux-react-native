import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import AntD from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {
  addTask,
  checkedTask,
  deleteSelected,
  deleteTask,
  editTask,
} from '../redux';

interface IState {
  input: string;
  edit: boolean;
  id: number;
}

interface IProps {}

export class Todo1 extends Component<any, IState> {
  state: IState = {
    input: '',
    edit: false,
    id: -1,
  };

  inputHandler = (e: string) => {
    this.setState({input: e});
  };

  addingTask = (task: string) => {
    this.props.addTaskin(task);
    this.setState({input: ''});
  };

  deletingTask = (id: any) => {
    if (!this.state.edit) {
      this.props.deletingTask(id); 
    }
  };

  editingTask = (id: any, task: string) => {
    this.setState({input: task, edit: true, id: id});
  };

  toUpdate = (id: number, input: string) => {
    this.props.editingTask(id, input);
    this.setState({edit: false, input: '', id: -1});
  };

  checking = (id: any) => {
    this.props.checkingTask(id);
  };

  deletingItems = () => {
    const tList = this.props.todo.filter((ele: any) => ele.checked);
    const list = tList.map((ele:any) => ele.id) 
    this.props.deletingTasks(list);
  };

  render() {
    const {input, edit, id} = this.state;
    const {inputHandler, addingTask, deletingItems} = this;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#4B194F'} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>To-Do.</Text>
          <Text style={styles.headerDate}>2023-07-21</Text>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            data={this.props.todo}
            renderItem={({item}: any) => (
              <View style={styles.eachTask}>
                <View style={styles.content}>
                  <TouchableOpacity onPress={() => this.checking(item.id)}>
                    {!item.checked ? (
                      <Entypo name="circle" size={20} color="#4B194F" />
                    ) : (
                      <AntD name="checkcircle" size={20} color="#4B194F" />
                    )}
                  </TouchableOpacity>
                  <View>
                    <Text style={styles.taskText}>{item.task}</Text>
                    <Text style={styles.helperText}>Task</Text>
                  </View>
                </View>
                <Entypo
                  name="edit"
                  size={30}
                  color="#4B194F"
                  onPress={() => this.editingTask(item.id, item.task)}
                />
                <MCI
                  name="delete"
                  size={30}
                  color="#4B194F"
                  onPress={() => this.deletingTask(item.id)}
                />
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
       { <View style={styles.select}>
          <Text onPress={deletingItems} style={styles.selectText} >DeleteAll</Text>
        </View>}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            value={input}
            placeholder="Add Task..."
            onChangeText={inputHandler}
          />
          <View style={styles.button}>
            <AntD
              name="plus"
              size={30}
              onPress={() => {
                !edit ? addingTask(input) : this.toUpdate(id, input);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    todo: state.todo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTaskin: (text: string) => dispatch(addTask(text)),
    deletingTask: (id: any) => dispatch(deleteTask(id)),
    editingTask: (id: any, task: string) => dispatch(editTask(id, task)),
    checkingTask: (id: any) => dispatch(checkedTask(id)),
    deletingTasks: (list: any) => dispatch(deleteSelected(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo1);

const styles = StyleSheet.create({
  select:{
    alignSelf:'flex-end'
  },
  selectText : {
    backgroundColor:'white',
    color: '#4B194F',
    padding:10,
    borderRadius:15
  },
  container: {
    backgroundColor: '#4B194F',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '700',
  },
  headerDate: {
    color: 'white',
    fontWeight: '900',
    fontSize: 16,
  },
  flatlist: {
    paddingVertical: 20,
    flex: 1,
    marginVertical: 20,
  },
  inputContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  inputField: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 9,
    width: '80%',
    borderRadius: 10,
    fontSize: 17,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
  },
  eachTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
    gap: 10,
  },
  taskText: {
    // color: '4B194F',
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  helperText: {
    color: 'orange',
  },
});
