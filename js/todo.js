const importTodo = () => {
   const todoForm = document.getElementById("todo-form"); // todo 할 일 작성 폼 선택
   const toDoInput = todoForm.querySelector("input"); // todo 할 일 입력창 선택
   const todoList = document.getElementById("todo-list"); // todo 할 일 목록 선ㅌ택
   let todos = [];
   const todoKey = "todos"
   
   // * 할 일 목록에 할 일 추가 함수
   const deleteTodo = (event) => {
      const li = event.target.parentElement;
      li.remove();
      todos = todos.filter((toDo) => toDo.id !== Number(li.id));
      saveToDos();
   }
   
   const saveToDos = () => {
      localStorage.setItem("todos",JSON.stringify(todos));
   };
   
   const patinTodo = (newTodo) =>{
      const li = document.createElement("li");
      li.id = newTodo.id;

      const span = document.createElement("span");
      span.innerText = newTodo.text;

      const btn = document.createElement("button");
      btn.innerText = "X";

      const checkbox = document.createElement("input")
      checkbox.type = "checkbox"
      checkbox.className = newTodo.id

      btn.addEventListener("click",deleteTodo);
      checkbox.addEventListener("click", ()=> {
         const span = li.childNodes[1]
         // 체크박스 클래스 네임 받아서 클래스 네임으로 된 아이디 li > span 에 밑줄
         if(checkbox.checked) span.style.textDecoration = "line-through";
         else span.style.textDecoration = "";
      })
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(btn);
      todoList.appendChild(li);
   }
   
   // * form 태그 submit 시 새로고침기능 제어
   const handleToDoSubmit = (event) => {
      event.preventDefault();
      const newTodo = toDoInput.value;
      toDoInput.value = "";
      const objectTodo = {
         id : Date.now(),
         text : newTodo
      }
      todos.push(objectTodo);
      patinTodo(objectTodo);
      saveToDos();
   }
   
   todoForm.addEventListener("submit", handleToDoSubmit);
   
   toDoInput.addEventListener("focus", () => {
      console.log("input")
      todoForm.boxShadow = "inset 0 0 0 1.5px #2196f3, 0 -10px 10px #fff;"
  });

   const savedToDos = localStorage.getItem(todoKey);
   
   if(savedToDos !== null) {
      const parseTodos = JSON.parse(savedToDos);
      todos = parseTodos;
      parseTodos.forEach(patinTodo);
   }
}