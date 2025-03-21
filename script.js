/*
? Fetch Levels Data from API and display them on Site and show the Active one diff-styled Dynamically
? Fetch Words Data from API and display them on Site with Pretty Design like Figma
? If no Words exist in a Lesson, then show an Error-like Message
? Build Vocabulary Details Modal for every Vocabulary Words Dynamically
? Apply Code-based LogIn and LogOut System
? Implement Smooth Scrolling on Bookmarks
! Develop & Insert a Loading Spinner that appears only when the Lesson Vocabularies loads and displays
*/


//! Task-1

//? Fetching Levels/Lessons
fetch("https://openapi.programming-hero.com/api/levels/all")
.then(response => response.json())
.then(data => {
    displayLessons(data.data);
})

const displayLessons = (lessons) => {
    const lessonContainer = document.getElementById('lesson-picker');
    for (const lesson of lessons)
    {
        const lessonElement = document.createElement('div');
        lessonElement.innerHTML = `
        <span class="fas fa-book-open"></span> Lesson-${lesson.level_no}
        `;
        lessonElement.classList.add('lesson', 'font-english', 'flex', 'items-center', 'gap-x-2', 'font-semibold', 'border', 'border-primary', 'rounded', 'px-4', 'py-2', 'text-primary', 'hover:bg-primary', 'transition-[shadow_background_text]', 'duration-200', 'hover:text-[#E0E7FF]', 'hover:shadow-md', 'hover:shadow-indigo-500', 'active:shadow-none', 'cursor-pointer');
        lessonElement.setAttribute('title', lesson.lessonName);
        lessonContainer.appendChild(lessonElement);
    }
}


//! Task-2

document.getElementById('lesson-picker').addEventListener('click', function(event){
    if (event.target.classList.contains('lesson'))
    {
        const lessons = document.querySelectorAll('#lesson-picker div');
        lessons.forEach(lesson => {
            lesson.classList.replace('text-[#E0E7FF]', 'text-primary');
            lesson.classList.remove('bg-primary');
        })
        event.target.classList.replace('text-primary', 'text-[#E0E7FF]');
        event.target.classList.add('bg-primary');
        //? Fetching Words
        fetch(`https://openapi.programming-hero.com/api/level/${event.target.innerText.charAt(7)}`)
        .then(response => response.json())
        .then(data => {
            if (data.data.length === 0)
                noWordError();
            else
                displayWords(data.data);
        })
    }
})


const displayWords = (words) => {
    const wordsContainer = document.getElementById('lesson-content');
    wordsContainer.innerHTML = "";
    wordsContainer.classList.replace('py-16', 'p-8');
    wordsContainer.classList.add('grid', 'grid-cols-3', 'gap-8');
    for (const word of words) {
        const wordName = word.word;
        const wordMeaning = word.meaning;
        const wordPronunciation = word.pronunciation;
        const wordBox = document.createElement('div');
        wordBox.classList.add('word-box', 'bg-[#EEF]', 'h-full', 'rounded-xl', 'p-12', 'space-y-5');
        const wordId = document.createElement('p');
        wordId.innerText = word.id;
        wordId.classList.add('hidden');
        const wordNameEl = document.createElement('h3');
        wordNameEl.innerText = wordName;
        wordNameEl.classList.add('text-3xl', 'font-bold', 'text-center', 'font-english');
        const wordMP = document.createElement('h3');
        if (!wordMeaning)
            wordMP.innerText = `"অর্থ নেই / ${wordPronunciation}"`;
        else
            wordMP.innerText = `"${wordMeaning} / ${wordPronunciation}"`;
        wordMP.classList.add('text-[1.75rem]', 'font-semibold', 'text-center', 'text-zinc-700', 'font-bangla');
        const MPSyntax = document.createElement('h6');
        MPSyntax.innerText = "Meaning / Pronunciation";
        MPSyntax.classList.add('text-lg', 'font-medium', 'text-center', 'font-english');
        const wordIconsContainer = document.createElement('div');
        wordIconsContainer.classList.add('flex', 'justify-between');
        wordIconsContainer.innerHTML = `
                <h4 class="fas fa-circle-info text-slate-700 bg-blue-100 rounded-lg px-4 py-3 text-2xl cursor-pointer hover:text-primary active:text-indigo-600"></h4>
                <h4 class="fas fa-volume-high text-slate-700 bg-blue-100 rounded-lg px-4 py-3 text-2xl hover:text-primary active:text-indigo-500"></h4>
                `;
        wordBox.append(wordId, wordNameEl, MPSyntax, wordMP, wordIconsContainer);
        wordsContainer.appendChild(wordBox);
    }
}


//! Task-3

const noWordError = () => {
    const wordsContainer = document.getElementById('lesson-content');
    wordsContainer.classList.replace('space-y-3', 'space-y-4');
    wordsContainer.classList.remove('grid', 'grid-cols-3', 'gap-8')
    wordsContainer.innerHTML = `
    <img src="./assets/error.png" alt="Error" class="mx-auto" />
    <p class="font-bangla text-[#79716B]" title="No Vocabulary has been added to this Lesson yet">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h2 class="text-4xl font-medium font-bangla" title="Go to the next lesson">নেক্সট Lesson এ যান</h2>
    `;
}

//! Task-4


document.getElementById('lesson-content').addEventListener('click', function(event){
    if (event.target.classList.contains('fa-circle-info'))
    {
        fetch(`https://openapi.programming-hero.com/api/word/${event.target.parentNode.parentNode.firstChild.innerText}`)
        .then(response => response.json())
        .then(data => {
            showWordModal(data.data);
        })
    }
})

const showWordModal = (word) => {
    const synonymsContainer = document.createElement('div');
    synonymsContainer.classList.add('flex', 'gap-4');
    if (word.synonyms)
    {
        for (const synonym of word.synonyms)
        {
            const synonymEl = document.createElement('h6');
            synonymEl.innerText = synonym;
            synonymEl.classList.add('font-bangla', 'text-xl', 'bg-blue-100', 'px-5', 'py-2', 'rounded-lg', 'border', 'border-[#DDD]');
            synonymsContainer.appendChild(synonymEl);
        }
    }
    const modal = document.createElement('dialog');
    modal.classList.add('modal', 'bg-[#DDDDFF90]', 'p-6', 'rounded-xl', 'space-y-6', 'backdrop-blur');
    modal.innerHTML = `
    <div class="border-2 border-[#EEE7] rounded-xl p-6 transition-all space-y-8">
        <h2 class="text-4xl font-semibold font-english">${word.word} (<span class="font-bangla"><span class="fas fa-microphone-lines"></span> : ${word.pronunciation}</span>)</h2>
        <div class="space-y-3">
            <h4 class="text-2xl font-semibold font-english">Meaning</h4>
            <h4 class="text-2xl font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</h4>
        </div>
        <div class="space-y-3">
            <h4 class="text-2xl font-semibold font-english">Example</h4>
            <h4 class="text-2xl font-english">${word.sentence}</h4>
        </div>
        <div class="space-y-3" id="synonyms-container">
            <h4 class="text-2xl font-semibold font-bangla">সমার্থক শব্দ গুলো</h4>
        </div>
    </div>
    <form method="DIALOG" class="transition-all">
        <button type="submit" class="bg-primary text-[#E0E7FF] border border-primary hover:bg-inherit hover:text-primary outline-none font-english px-8 py-2 rounded-xl active:bg-indigo-200 text-2xl">Complete Learning</button>
    </form>
    `;
    modal.querySelector('#synonyms-container').appendChild(synonymsContainer);
    document.body.appendChild(modal);
    modal.showModal();
    modal.addEventListener('close', function(){
        delete document.body.removeChild(modal);
    })
}


//! Task-5

document.getElementById('login-form').addEventListener('submit', function(event){
    event.preventDefault();
    const username = event.target.parentNode.querySelector('input[type="text"]');
    const password = event.target.parentNode.querySelector('input[type="password"]');
    LoginUser(username.value, password.value);
    username.value = '';
    password.value = '';
})

const LoginUser = (username, password) => {
    if (username === '')
        window.alert("Please enter the Username.");
    else if (password !== "123456")
        window.alert("Please enter the correct password.");
    else
    {
        document.querySelector('header').classList.remove('hidden');
        document.getElementById('vocabularies').classList.remove('hidden');
        document.getElementById('faq').classList.remove('hidden');
        document.getElementById('banner').classList.add('hidden');
        window.alert("You are logged in successfully!");
    }
}

document.querySelector('#nav-btns > button').addEventListener('click', function(){
    LogoutUser();
});

const LogoutUser = () => {
    document.querySelector('header').classList.add('hidden');
    document.getElementById('vocabularies').classList.add('hidden');
    document.getElementById('faq').classList.add('hidden');
    document.getElementById('banner').classList.remove('hidden');
}