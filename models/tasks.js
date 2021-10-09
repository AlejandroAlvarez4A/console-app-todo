
    const Task = require('./task');
    class Tasks {

        _listado = {};

        constructor () { 
            this._listado = {};
        }

        get listArray () {
            const list = [];
            Object.keys( this._listado ).forEach( key => {
                const task = this._listado[key];
                list.push( task );
            });
            return list;
        }

        deleteTask ( id = '') {
            if ( this._listado[id] ) {
                delete this._listado[id];
            }
        }
        createTask ( description = '') {
            const task = new Task(description)
            this._listado[task.id] = task;
        }

        loadTasksFromArray ( tasks = [] ) {
            tasks.forEach( task => {
                this._listado[task.id] = task; 
            })
        }

        listCompleted () {
            console.log();
            this.listArray.forEach( (task, index) => {
                const idx = `${index + 1}.`.green;
                const { desc, completed } = task;
                const state = (completed)
                                ? 'Completed'.green
                                : 'Pending'.red;  
                console.log(`${ idx } ${ desc } :: ${ state }`);
            });
        }
        listPendingCompleted ( completedSwitch ) { 
            console.log();
            let counterToList = 0;
            this.listArray.forEach( task => {
                const { desc, completed } = task;
                const state = (completed)
                                ? 'Completed'.green
                                : 'Pending'.red;
                if( completedSwitch ){
                    if( completed ) { 
                        counterToList++;
                        console.log(`${ (counterToList + '.').green } ${ desc } :: ${ completed.green }`);
                    }
                } else {
                    if( !completed ) {
                        counterToList++;
                        console.log(`${ (counterToList + '.').green } ${ desc } :: ${ state }`);
                    }
                }
                
            });
        }
        toggleCompleted ( ids = []) {
            ids.forEach( id => {
                const task = this._listado[id];
                if ( !task.completed ) {
                    task.completed = new Date().toISOString();
                }
            })
            this.listArray.forEach( task => {
                if ( !ids.includes( task.id ) ) {
                    this._listado[task.id].completed = null;
                }
            })
        }
    }

    module.exports = Tasks;
