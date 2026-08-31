/* ============================================================
   exercises.js
   Main Exercise Engine
   ============================================================ */

const ExerciseEngine = {
    questions: [],
    currentIndex: 0,
    score: 0,
    answered: false,
    totalQuestions: 0,
    userAnswers: [],
    isComplete: false,
    
    // Initialize the exercise with question data
    init: function(questions) {
        this.questions = questions;
        this.totalQuestions = questions.length;
        this.userAnswers = new Array(this.totalQuestions).fill(null);
        this.currentIndex = 0;
        this.score = 0;
        this.answered = false;
        this.isComplete = false;
        
        // Reset UI
        document.getElementById('progress-fill').style.width = '0%';
        document.getElementById('progress-text').textContent = '0 / ' + this.totalQuestions;
        document.getElementById('score-display').textContent = '0';
        
        this.renderQuestion(0);
    },
    
    renderQuestion: function(index) {
        if (index < 0 || index >= this.totalQuestions) return;
        
        const q = this.questions[index];
        const container = document.getElementById('question-container');
        this.currentIndex = index;
        this.answered = false;
        
        // Build question HTML based on type
        let html = '';
        html += `<div class="question-card" id="question-card">`;
        html += `<div class="question-number">Question ${index + 1} / ${this.totalQuestions}</div>`;
        html += `<div class="question-text">${q.text}</div>`;
        
        // Render options based on type
        if (q.type === 'mcq') {
            html += `<div class="options" id="options-container">`;
            q.options.forEach((opt, i) => {
                const letter = String.fromCharCode(97 + i); // a, b, c, d
                html += `
                    <label class="option" data-value="${letter}">
                        <input type="radio" name="question" value="${letter}" data-index="${i}">
                        ${letter}) ${opt}
                    </label>
                `;
            });
            html += `</div>`;
        } else if (q.type === 'tf') {
            html += `<div class="tf-options" id="options-container">`;
            html += `
                <label class="option" data-value="true">
                    <input type="radio" name="question" value="true"> True
                </label>
                <label class="option" data-value="false">
                    <input type="radio" name="question" value="false"> False
                </label>
            `;
            html += `</div>`;
        } else if (q.type === 'fill' || q.type === 'wordform' || q.type === 'error') {
            html += `<div class="fill-answer" id="fill-container">`;
            html += `<input type="text" class="answer-input" placeholder="Type your answer..." autocomplete="off">`;
            html += `</div>`;
        }
        
        // Feedback area
        html += `<div class="feedback" id="feedback"></div>`;
        
        // Action buttons
        html += `<div class="action-buttons">`;
        html += `<button class="btn-check" id="btn-check" onclick="ExerciseEngine.checkAnswer()">✅ Check Answer</button>`;
        html += `<button class="btn-show" id="btn-show" onclick="ExerciseEngine.showCorrect()">👁️ Show Correct Answer</button>`;
        html += `</div>`;
        
        html += `</div>`;
        
        container.innerHTML = html;
        
        // Restore previous answer if any
        if (this.userAnswers[index]) {
            const ans = this.userAnswers[index];
            if (q.type === 'mcq' || q.type === 'tf') {
                const radios = document.querySelectorAll('input[name="question"]');
                radios.forEach(radio => {
                    if (radio.value === ans) {
                        radio.checked = true;
                        radio.closest('.option').classList.add('selected');
                    }
                });
            } else if (q.type === 'fill' || q.type === 'wordform' || q.type === 'error') {
                const input = document.querySelector('.answer-input');
                if (input) input.value = ans;
            }
        }
        
        // Update progress
        this.updateProgress();
        this.updateNavButtons();
        
        // Add event listeners for option selection (visual feedback)
        document.querySelectorAll('.option').forEach(opt => {
            opt.addEventListener('click', function() {
                const radio = this.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
                    this.classList.add('selected');
                }
            });
        });
        
        // Enter key for fill in the blank
        const input = document.querySelector('.answer-input');
        if (input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    ExerciseEngine.checkAnswer();
                }
            });
            input.focus();
        }
    },
    
    checkAnswer: function() {
        if (this.answered) return;
        
        const q = this.questions[this.currentIndex];
        const feedback = document.getElementById('feedback');
        const card = document.getElementById('question-card');
        let userAnswer = null;
        
        // Get user answer based on type
        if (q.type === 'mcq' || q.type === 'tf') {
            const selected = document.querySelector('input[name="question"]:checked');
            if (!selected) {
                feedback.className = 'feedback show incorrect';
                feedback.innerHTML = '⚠️ Please select an answer first.';
                return;
            }
            userAnswer = selected.value;
        } else if (q.type === 'fill' || q.type === 'wordform' || q.type === 'error') {
            const input = document.querySelector('.answer-input');
            if (!input || !input.value.trim()) {
                feedback.className = 'feedback show incorrect';
                feedback.innerHTML = '⚠️ Please type your answer first.';
                return;
            }
            userAnswer = input.value.trim().toLowerCase();
        }
        
        // Store answer
        this.userAnswers[this.currentIndex] = userAnswer;
        
        // Check correctness (case insensitive for fill)
        let isCorrect = false;
        let correctDisplay = q.correct;
        
        if (q.type === 'mcq' || q.type === 'tf') {
            isCorrect = (userAnswer === q.correct);
            correctDisplay = q.correct;
        } else {
            // Case insensitive comparison for text answers
            isCorrect = (userAnswer === q.correct.toLowerCase());
            correctDisplay = q.correct;
        }
        
        this.answered = true;
        
        // Update score
        if (isCorrect) {
            this.score++;
            document.getElementById('score-display').textContent = this.score;
        }
        
        // Display feedback
        feedback.className = 'feedback show ' + (isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
            feedback.innerHTML = '✅ <strong>Correct!</strong> Well done! 🎉';
            card.classList.add('correct');
            // Play sound
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.playCorrect();
            }
            // Trigger confetti
            if (typeof triggerConfetti !== 'undefined') {
                triggerConfetti();
            }
        } else {
            feedback.innerHTML = `❌ <strong>Incorrect.</strong> The correct answer is: <span class="correct-answer-text">${correctDisplay}</span>`;
            card.classList.add('incorrect');
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.playIncorrect();
            }
        }
        
        // Highlight correct/wrong options for MCQ/TF
        if (q.type === 'mcq' || q.type === 'tf') {
            document.querySelectorAll('.option').forEach(opt => {
                const radio = opt.querySelector('input[type="radio"]');
                if (radio) {
                    if (radio.value === q.correct) {
                        opt.classList.add('correct-answer');
                    } else if (radio.checked && radio.value !== q.correct) {
                        opt.classList.add('wrong-answer');
                    }
                }
            });
        } else {
            const input = document.querySelector('.answer-input');
            if (input) {
                if (isCorrect) {
                    input.classList.add('correct-input');
                } else {
                    input.classList.add('incorrect-input');
                }
            }
        }
        
        // Disable check button
        document.getElementById('btn-check').disabled = true;
        document.getElementById('btn-show').disabled = true;
        
        this.updateProgress();
        this.updateNavButtons();
    },
    
    showCorrect: function() {
        if (this.answered) return;
        
        const q = this.questions[this.currentIndex];
        const feedback = document.getElementById('feedback');
        const card = document.getElementById('question-card');
        
        feedback.className = 'feedback show incorrect';
        feedback.innerHTML = `👁️ The correct answer is: <span class="correct-answer-text">${q.correct}</span>`;
        card.classList.add('incorrect');
        
        // Highlight correct option for MCQ/TF
        if (q.type === 'mcq' || q.type === 'tf') {
            document.querySelectorAll('.option').forEach(opt => {
                const radio = opt.querySelector('input[type="radio"]');
                if (radio && radio.value === q.correct) {
                    opt.classList.add('show-correct');
                }
            });
        } else {
            const input = document.querySelector('.answer-input');
            if (input) {
                input.value = q.correct;
                input.classList.add('correct-input');
            }
        }
        
        this.answered = true;
        document.getElementById('btn-check').disabled = true;
        document.getElementById('btn-show').disabled = true;
        
        this.updateProgress();
        this.updateNavButtons();
    },
    
    nextQuestion: function() {
        if (this.currentIndex < this.totalQuestions - 1) {
            this.currentIndex++;
            this.renderQuestion(this.currentIndex);
        } else {
            // Check if all questions are answered
            const allAnswered = this.userAnswers.every(a => a !== null);
            if (allAnswered) {
                this.showResults();
            } else {
                // Find first unanswered question
                const firstUnanswered = this.userAnswers.findIndex(a => a === null);
                if (firstUnanswered !== -1) {
                    this.currentIndex = firstUnanswered;
                    this.renderQuestion(this.currentIndex);
                }
            }
        }
    },
    
    prevQuestion: function() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.renderQuestion(this.currentIndex);
        }
    },
    
    updateProgress: function() {
        const answered = this.userAnswers.filter(a => a !== null).length;
        const pct = (answered / this.totalQuestions) * 100;
        document.getElementById('progress-fill').style.width = pct + '%';
        document.getElementById('progress-text').textContent = answered + ' / ' + this.totalQuestions;
    },
    
    updateNavButtons: function() {
        const prevBtn = document.getElementById('btn-prev');
        const nextBtn = document.getElementById('btn-next');
        if (prevBtn) prevBtn.disabled = (this.currentIndex === 0);
        if (nextBtn) {
            if (this.currentIndex === this.totalQuestions - 1) {
                const allAnswered = this.userAnswers.every(a => a !== null);
                nextBtn.textContent = allAnswered ? '📊 Show Results' : '⏭️ Finish';
            } else {
                nextBtn.textContent = 'Next Question →';
            }
        }
    },
    
    showResults: function() {
        const container = document.getElementById('question-container');
        const pct = Math.round((this.score / this.totalQuestions) * 100);
        let message = '';
        let emoji = '';
        if (pct >= 90) { message = 'Excellent! You are a master!'; emoji = '🏆'; }
        else if (pct >= 70) { message = 'Good job! Keep practicing!'; emoji = '⭐'; }
        else if (pct >= 50) { message = 'Not bad. Review the material and try again!'; emoji = '📖'; }
        else { message = 'Keep studying! You\'ll get better!'; emoji = '💪'; }
        
        container.innerHTML = `
            <div class="results-container">
                <div class="score-label">Your Score</div>
                <div class="score-final">${this.score} / ${this.totalQuestions}</div>
                <div class="result-message">${emoji} ${message}</div>
                <div class="result-details">
                    <div class="stat">
                        <div class="number" style="color: #34C759;">${this.score}</div>
                        <div class="label">✅ Correct</div>
                    </div>
                    <div class="stat">
                        <div class="number" style="color: #FF3B30;">${this.totalQuestions - this.score}</div>
                        <div class="label">❌ Incorrect</div>
                    </div>
                    <div class="stat">
                        <div class="number" style="color: var(--color-primary);">${pct}%</div>
                        <div class="label">📊 Accuracy</div>
                    </div>
                </div>
                <button class="btn-reset" onclick="ExerciseEngine.resetQuiz()">🔄 Retry Quiz</button>
            </div>
        `;
        
        // Play celebration sound and confetti if good score
        if (pct >= 70) {
            if (typeof SoundEngine !== 'undefined') {
                SoundEngine.playCelebration();
            }
            if (typeof triggerConfetti !== 'undefined') {
                setTimeout(triggerConfetti, 300);
                setTimeout(triggerConfetti, 1000);
            }
        }
        
        document.getElementById('nav-buttons').style.display = 'none';
        document.getElementById('progress-container').style.display = 'none';
        this.isComplete = true;
    },
    
    resetQuiz: function() {
        this.init(this.questions);
        document.getElementById('nav-buttons').style.display = 'flex';
        document.getElementById('progress-container').style.display = 'block';
        this.isComplete = false;
    }
};