/*
? Fetch Levels Data from API and display them on Site and show the Active one diff-styled Dynamically.
? Fetch Words Data from API and display them on Site with Pretty Design like Figma.
? If no Words exist in a Lesson, then show an Error-like Message.
! Build Vocabulary Details Modal for every Vocabulary Words Dynamically.
*/


//! Task-1

//? Fetching Levels/Lessons
fetch("https://openapi.programming-hero.com/api/levels/all")
.then(response => response.json())
.then(data => {
    displayLessons(data.data);
})

const displayLessons = (lessons) => {
    //? Getting the Container
    const lessonContainer = document.getElementById('lesson-picker');
    for (const lesson of lessons)
    {
        //? Creating the Box (Element) of a Lesson
        const lessonElement = document.createElement('div');
        lessonElement.innerHTML = `
        <span class="fas fa-book-open"></span> Lesson-${lesson.level_no}
        `;
        lessonElement.classList.add('lesson', 'font-english', 'flex', 'items-center', 'gap-x-2', 'font-semibold', 'border', 'border-primary', 'rounded', 'px-4', 'py-2', 'text-primary', 'hover:bg-primary', 'transition-[shadow_background_text]', 'duration-200', 'hover:text-[#E0E7FF]', 'hover:shadow-md', 'hover:shadow-indigo-500', 'active:shadow-none', 'cursor-pointer');
        lessonElement.setAttribute('title', lesson.lessonName);
        //? Displaying it on Web Page
        lessonContainer.appendChild(lessonElement);
    }
}


//! Task-2

//? Adding EventListener in Lesson Boxes
document.getElementById('lesson-picker').addEventListener('click', function(event){
    //? Activating the Clicked Lesson Box
    event.target.classList.replace('text-primary', 'text-[#E0E7FF]');
    event.target.classList.add('bg-primary');
    //? Fetching Words
    fetch(`https://openapi.programming-hero.com/api/level/${event.target.innerText.charAt(7)}`)
    .then(response => response.json())
    .then(data => {
        //? Checking if the Lesson has Words or not
        if (data.data.length === 0)
            noWordError();
        else
            displayWords(data.data);
    })
    // event.target.classList.replace('text-[#E0E7FF]', 'text-primary');
    // event.target.classList.remove('bg-primary')
})

const displayWords = (words) => {
    const wordsContainer = document.getElementById('lesson-content');
    wordsContainer.innerHTML = "";
    wordsContainer.classList.replace('py-16', 'p-8');
    wordsContainer.classList.add('grid', 'grid-cols-3', 'gap-8');
    for (const word of words) {
        //? Defining Word Info in Variables
        const wordName = word.word;
        const wordMeaning = word.meaning;
        const wordPronunciation = word.pronunciation;
        //? Creating the Box of a Word Info
        const wordBox = document.createElement('div');
        wordBox.classList.add('word-box', 'bg-[#EEF]', 'rounded-xl', 'p-12', 'space-y-5');
        //? Creating Elements inside the Box
        const wordNameEl = document.createElement('h3');
        wordNameEl.innerText = wordName;
        wordNameEl.classList.add('text-3xl', 'font-bold', 'text-center', 'font-english');
        const wordMP = document.createElement('h3');
        wordMP.innerText = `"${wordMeaning} / ${wordPronunciation}"`;
        wordMP.classList.add('text-[1.75rem]', 'font-semibold', 'text-center', 'text-zinc-700', 'font-bangla');
        const MPSyntax = document.createElement('h6');
        MPSyntax.innerText = "Meaning / Pronunciation";
        MPSyntax.classList.add('text-lg', 'font-medium', 'text-center', 'font-english');
        const wordIconsContainer = document.createElement('div');
        wordIconsContainer.classList.add('flex', 'justify-between');
        wordIconsContainer.innerHTML = `
                <h4 class="fas fa-circle-info text-slate-700 bg-blue-100 rounded-lg px-4 py-3 text-2xl"></h4>
                <h4 class="fas fa-volume-high text-slate-700 bg-blue-100 rounded-lg px-4 py-3 text-2xl"></h4>
                `;
        //? Displaying on Web Page
        wordBox.append(wordNameEl, MPSyntax, wordMP, wordIconsContainer);
        wordsContainer.appendChild(wordBox);
    }
}


//! Task-3

const noWordError = () => {
    const wordsContainer = document.getElementById('lesson-content');
    wordsContainer.classList.replace('space-y-3', 'space-y-4')
    wordsContainer.innerHTML = `
    <img src="./assets/error.png" alt="Error" class="mx-auto" />
    <p class="font-bangla text-[#79716B]" title="No Vocabulary has been added to this Lesson yet">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h2 class="text-4xl font-medium font-bangla" title="Go to the next lesson">নেক্সট Lesson এ যান</h2>
    `;
}