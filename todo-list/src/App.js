import { useRef, useState } from "react";
import "./App.css";

// تعريف مكون React الرئيسي
function App() {
  // استخدام useState لتعريف حالة todos وتعيين دالة setToDos لتحديثها
  const [todos, setToDos] = useState(() => {
    // استرجاع البيانات من localStorage عند تحميل الصفحة
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // استخدام useRef لإنشاء مرجع يمكن استخدامه للوصول إلى قيمة حقل الإدخال
  const inputRef = useRef();

  // دالة لإضافة مهمة جديدة إلى قائمة المهام
  function addInToDoList() {
    const text = inputRef.current.value; // الحصول على النص المدخل من حقل الإدخال
    const newItem = { completed: false, text }; // إنشاء كائن جديد يمثل المهمة الجديدة
    const newToDos = [...todos, newItem]; // إنشاء مصفوفة جديدة تحتوي على المهام الحالية بالإضافة إلى المهمة الجديدة
    setToDos(newToDos); // تحديث حالة todos بالمصفوفة الجديدة
    localStorage.setItem("todos", JSON.stringify(newToDos)); // حفظ البيانات في localStorage
    inputRef.current.value = ""; // إعادة تعيين حقل الإدخال ليكون فارغًا
  }

  // دالة لتغيير حالة إتمام المهمة
  const hendelItemDone = (key) => {
    const newToDos = [...todos]; // إنشاء نسخة من مصفوفة المهام الحالية
    newToDos[key].completed = !newToDos[key].completed; // تغيير حالة إتمام المهمة المحددة
    setToDos(newToDos); // تحديث حالة todos بالمصفوفة الجديدة
    localStorage.setItem("todos", JSON.stringify(newToDos)); // تحديث البيانات في localStorage
  };

  // دالة لحذف مهمة من قائمة المهام
  function hendleDelete(key) {
    const newToDos = [...todos]; // إنشاء نسخة من مصفوفة المهام الحالية
    newToDos.splice(key, 1); // حذف المهمة المحددة من المصفوفة
    setToDos(newToDos); // تحديث حالة todos بالمصفوفة الجديدة
    localStorage.setItem("todos", JSON.stringify(newToDos)); // تحديث البيانات في localStorage
  }

  // تعريف واجهة المستخدم للمكون
  return (
    <div className="App">
      <h2>To Do List</h2>
      <div className="container">
        <ul>
          {todos.map(({ text, completed }, key) => (
            <div className="item" key={key}>
              <li
                className={completed ? "done" : ""}
                onClick={() => hendelItemDone(key)}>
                {text}
              </li>
              <span onClick={() => hendleDelete(key)}>❌</span>
            </div>
          ))}
        </ul>
        <input ref={inputRef} type="text" /> {/* حقل إدخال لإضافة مهمة جديدة */}
        <button onClick={addInToDoList}>Add</button>{" "}
        {/* زر لإضافة المهمة الجديدة */}
      </div>
    </div>
  );
}

export default App; // تصدير المكون App ليتمكن من استخدامه في مكان آخر
