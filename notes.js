let allLessons = [];
let activeUid = "guest";
let activeLesson = null;
const levelSelect = document.getElementById("levelSelect");
const subjectSelect = document.getElementById("subjectSelect");
const topicSearch = document.getElementById("topicSearch");
const topicList = document.getElementById("topicList");
const lessonMeta = document.getElementById("lessonMeta");
const lessonTitle = document.getElementById("lessonTitle");
const lessonContent = document.getElementById("lessonContent");
const questionList = document.getElementById("questionList");
const answerList = document.getElementById("answerList");
const ownNotes = document.getElementById("ownNotes");
const saveStatus = document.getElementById("saveStatus");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const levels = ["P1","P2","P3","P4","P5","P6","P7","S1","S2","S3","S4","S5","S6"];
function storageKey(lesson){ return `urh-own-notes:${activeUid}:${lesson.level}:${lesson.subject}:${lesson.topic}`; }
function fillLevels(){
  levelSelect.innerHTML = levels.map(l=>`<option value="${l}">${l}</option>`).join("");
  const wanted = new URLSearchParams(location.search).get("level");
  if(levels.includes(wanted)) levelSelect.value=wanted;
  fillSubjects();
}
function fillSubjects(){
  const items = allLessons.filter(x=>x.level===levelSelect.value);
  const current = subjectSelect.value;
  const subjects = [...new Set(items.map(x=>x.subject))];
  subjectSelect.innerHTML = subjects.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join("");
  if(subjects.includes(current)) subjectSelect.value=current;
  renderTopics();
}
function renderTopics(){
  const q = topicSearch.value.trim().toLowerCase();
  const items = allLessons.filter(x=>x.level===levelSelect.value && x.subject===subjectSelect.value && `${x.topic} ${x.subject}`.toLowerCase().includes(q));
  topicList.innerHTML = items.map((x,i)=>`<button class="topic-button" type="button" data-topic="${esc(x.topic)}" aria-current="${activeLesson===x?'true':'false'}">${esc(x.topic)}<small>${esc(x.subject)}</small></button>`).join("") || '<div class="empty-topic">No topics match this search.</div>';
  topicList.querySelectorAll("[data-topic]").forEach(b=>b.addEventListener("click",()=>showLesson(items.find(x=>x.topic===b.dataset.topic))));
  if(items.length && (!activeLesson || !items.includes(activeLesson))) showLesson(items[0]);
  if(!items.length){activeLesson=null;lessonTitle.textContent="No matching lessons";lessonMeta.innerHTML="";lessonContent.innerHTML="";questionList.innerHTML="";answerList.innerHTML="";ownNotes.value="";}
}
function showLesson(x){
  if(!x)return; activeLesson=x;
  lessonMeta.innerHTML=`<span>${esc(x.level)}</span><span>•</span><span>${esc(x.subject)}</span>`;
  lessonTitle.textContent=x.topic;
  const oldLink=document.getElementById("openFullLesson"); if(oldLink) oldLink.remove();
  const fullLink=document.createElement("a"); fullLink.id="openFullLesson"; fullLink.className="btn btn-outline"; fullLink.textContent="Open this lesson as its own page"; fullLink.href=`${x.level.toLowerCase()}-${x.subject.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}-${x.topic.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}.html`; lessonTitle.insertAdjacentElement("afterend",fullLink);
  lessonContent.innerHTML=`<h3>What you will learn</h3><ul>${x.objectives.map(t=>`<li>${esc(t)}</li>`).join("")}</ul><h3>Lesson notes</h3>${x.explanation.map(t=>`<p>${esc(t)}</p>`).join("")}<div class="example-box"><strong>Worked example</strong><p>${esc(x.example)}</p></div>`;
  questionList.innerHTML=x.questions.map(t=>`<li>${esc(t)}</li>`).join("");
  answerList.innerHTML=x.answers.map(t=>`<li>${esc(t)}</li>`).join("");
  ownNotes.value=localStorage.getItem(storageKey(x)) || "";
  saveStatus.textContent="Your notes are saved automatically on this device.";
  topicList.querySelectorAll("[data-topic]").forEach(b=>b.setAttribute("aria-current",b.dataset.topic===x.topic?"true":"false"));
}
levelSelect.addEventListener("change",fillSubjects);
subjectSelect.addEventListener("change",renderTopics);
topicSearch.addEventListener("input",renderTopics);
ownNotes.addEventListener("input",()=>{
 if(!activeLesson)return;
 localStorage.setItem(storageKey(activeLesson),ownNotes.value);
 saveStatus.textContent="Saved on this device ✓";
});
document.getElementById("clearOwnNotes").addEventListener("click",()=>{
 if(!activeLesson)return;
 if(confirm("Clear your personal notes for this lesson on this device?")){
   localStorage.removeItem(storageKey(activeLesson));ownNotes.value="";saveStatus.textContent="Personal notes cleared.";
 }
});
document.getElementById("downloadLesson").addEventListener("click",()=>window.print());
document.getElementById("downloadClass").addEventListener("click",()=>{
 const level=levelSelect.value;
 const a=document.createElement("a");a.href=`./${level.toLowerCase()}-starter-notes.pdf`;a.download=`${level}-starter-notes.pdf`;a.click();
});
window.addEventListener("urh-auth-ready",e=>{activeUid=e.detail?.uid || "guest";});
fetch("./notes-data.json").then(r=>{if(!r.ok)throw new Error("Could not load notes");return r.json();}).then(data=>{
 allLessons=data;fillLevels();
}).catch(err=>{lessonTitle.textContent="Notes could not be loaded";lessonContent.innerHTML="<p>Please refresh the page and check that notes-data.json was uploaded beside notes.html.</p>";console.error(err);});
