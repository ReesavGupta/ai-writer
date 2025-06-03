document.addEventListener('DOMContentLoaded', () => {
    const topicInput = document.getElementById('topic');
    const modelSelect = document.getElementById('model_name');
    const customModelInput = document.getElementById('custom_model_name');
    const generateBtn = document.getElementById('generateBtn');
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    const outputTextarea = document.getElementById('output');
    const errorDiv = document.getElementById('error');
    const errorMessageSpan = document.getElementById('errorMessage');

    modelSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customModelInput.style.display = 'block';
            customModelInput.focus();
        } else {
            customModelInput.style.display = 'none';
        }
    });

    generateBtn.addEventListener('click', async () => {
        const topic = topicInput.value.trim();
        let model_name = modelSelect.value;

        if (model_name === 'custom') {
            model_name = customModelInput.value.trim();
            if (!model_name) {
                showError('Please enter a custom model name.');
                return;
            }
        }

        if (!topic) {
            showError('Please enter a blog post topic.');
            return;
        }

        showLoading();

        try {
            const response = await fetch('/generate-intro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic, model_name }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            showResult(data.intro);

        } catch (error) {
            console.error('Fetch error:', error);
            showError(error.message || 'Failed to generate intro. See console for details.');
        } finally {
            hideLoading();
        }
    });

    function showLoading() {
        loadingDiv.style.display = 'block';
        resultDiv.style.display = 'none';
        errorDiv.style.display = 'none';
        generateBtn.disabled = true;
    }

    function hideLoading() {
        loadingDiv.style.display = 'none';
        generateBtn.disabled = false;
    }

    function showResult(introText) {
        resultDiv.style.display = 'block';
        outputTextarea.value = introText;
        errorDiv.style.display = 'none';
    }

    function showError(message) {
        errorDiv.style.display = 'block';
        errorMessageSpan.textContent = message;
        resultDiv.style.display = 'none';
    }
}); 