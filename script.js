let originalImage; // 保存原始图片的引用

// 处理图片上传
document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            originalImage = new Image(); // 创建一个新的图片对象
           originalImage.onload = function() {
            const canvas = document.getElementById('imagePreview');
            const ctx = canvas.getContext('2d');
            
            // 设置画布尺寸以适应图片大小并保持宽高比
            canvas.width = originalImage.width;
            canvas.height = originalImage.height;
            
            // 计算缩放比例
            const scale = Math.min(canvas.clientWidth / originalImage.width, canvas.clientHeight / originalImage.height);
            
            // 应用缩放比例并保持居中
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(originalImage, (canvas.width - originalImage.width * scale) / 2, (canvas.height - originalImage.height * scale) / 2, originalImage.width * scale, originalImage.height * scale);
            
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制图片
    ctx.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height);
    applyStyle('original'); // 初始应用原始风格
};

            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// 处理风格切换
function applyStyle(style) {
    const canvas = document.getElementById('imagePreview');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
    ctx.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height);
    ctx.filter = ''; // 清除之前的滤镜效果
    switch (style) {
        case 'ccd':
            ctx.filter = 'contrast(1.2) saturate(1.2) brightness(1.1)';
            break;
        case 'leica':
            ctx.filter = 'sepia(0.2) contrast(1.2) brightness(1.1) hue-rotate(-10deg) saturate(1.3)';
            break;
        case 'aesthetic':
            ctx.filter = 'blur(2px) saturate(1.5) brightness(1.2)';
            break;
        case 'retro':
            ctx.filter = 'sepia(0.6) contrast(1.1) brightness(0.9)';
            break;
        case 'blackAndWhite':
            ctx.filter = 'grayscale(100%)';
            break;
        case 'vintage':
            ctx.filter = 'sepia(0.3) contrast(1.2) brightness(0.9)';
            break;
        case 'coldTone':
            ctx.filter = 'hue-rotate(30deg) saturate(1.2)';
            break;
        case 'warmTone':
            ctx.filter = 'sepia(0.3) contrast(1.1) brightness(1.1)';
            break;
        case 'hdr':
            ctx.filter = 'contrast(1.5) saturate(1.5)';
            break;
        default:
            ctx.filter = 'none';
    }
    ctx.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height); // 重新绘制图片以应用滤镜
}

// 保存图片
document.getElementById('saveButton').addEventListener('click', function() {
    const canvas = document.getElementById('imagePreview');
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'styled-image.png';
    link.href = dataURL;
    link.click();
});
// 自定义下拉菜单逻辑
const selectContainer = document.getElementById('styleSelectContainer');
const selectedText = document.getElementById('selectedStyle');
const optionsList = selectContainer.querySelector('.custom-select-options');
const options = document.querySelectorAll('.custom-select-option');

// 点击下拉菜单显示选项列表
selectedText.addEventListener('click', (e) => {
    e.stopPropagation();
    optionsList.style.display = optionsList.style.display === 'block' ? 'none' : 'block';
});


// 点击选项时设置文本并隐藏选项列表
options.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('selectedTextStyle').textContent = option.textContent; // 更新选中的风格文本
        optionsList.style.display = 'none';
        applyStyle(option.getAttribute('data-value'));
    });
});

// 点击选项外的区域关闭下拉菜单
document.addEventListener('click', (e) => {
    if (!selectContainer.contains(e.target)) {
        optionsList.style.display = 'none';
    }
});
