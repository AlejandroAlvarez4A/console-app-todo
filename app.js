require('colors') ;
// const { showMenu, pause } = require('./helpers/messages');
const { 
    inquirerMenu,
    pause,
    readInput,
    listTaskDeleted,
    confirm,
    showCheckList } = require('./helpers/inquirer');
const { safeDB, readDB } = require('./helpers/safeFile');
const Tasks = require('./models/tasks');

const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readDB();
    if (tasksDB){
        tasks.loadTasksFromArray(tasksDB);
    }
    do {
        // print Menu
        opt = await inquirerMenu();
        switch ( opt ) {
            case '1':
                const description = await readInput('Description: ');
                tasks.createTask(description);
                break;
            case '2':
                tasks.listCompleted();
                break;
            case '3':
                tasks.listPendingCompleted(true);
                break;
            case '4':
                tasks.listPendingCompleted(false);
                break;
            case '5':
                const ids = await showCheckList(tasks.listArray);
                tasks.toggleCompleted( ids );
                break;
            case '6':
                const id = await listTaskDeleted(tasks.listArray);
                if ( id !== '0' ) {
                    const ok = await confirm('Are you sure?');
                    if( ok ){
                        tasks.deleteTask(id);
                        console.log('Successfully removed');
                    }
                }
            break;
        }
        if( opt !== '0') await pause();
        safeDB(tasks.listArray);
    } while ( opt != '0');

}

main();
