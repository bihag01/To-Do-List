# To-Do-List
Aplicacion de Tareas Pendiente (To-Do List App) hecha con React + Typescript + Vite
Esta app web se construyo con practica de manejo de estado.
Permite editar el texto de una tarea, ver las tareas completas o pendientes , agregar las tareas 
en un localStorage y un contador de tareas.

En cuanto a los siguientes puntos que toco ademas es el uso de useEffect de la mano con useState para la creacion de un Custom Hook el cual permite guardar los tasks en un localStorage, llamado 
useLocalStorage el cual permite guardar los tasks, lo cual hace que los datos persistencia automatica.

Primero, se tiene un estado con useState que inicializa leyendo los datos del localStorage, si encuentra algo lo convierte si no, devuelve vacio , luego con useEffect, detecta cada vez el estado cambia y vuelve a guardar los datos en el localStorage, al final retorna tanto la lista de task como la funcion para modificarla.
