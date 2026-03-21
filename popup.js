// 前凌智选 - 活动创建插件
// popup.js - 外部脚本文件

// MCP 服务器地址
const MCP_URL = 'https://api.fore.vip/mcp/tools/call';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    resetDefaultTime();
    setupFormHandler();
});

// 设置表单提交处理
function setupFormHandler() {
    const form = document.getElementById('activityForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
}

// 表单提交处理
async function handleSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const message = document.getElementById('message');
    
    message.style.display = 'none';
    message.className = 'message';
    
    const formData = {
        content: document.getElementById('content').value,
        start_time: new Date(document.getElementById('start_time').value).getTime(),
        end_time: document.getElementById('end_time').value ? 
            new Date(document.getElementById('end_time').value).getTime() : undefined,
        address: document.getElementById('address').value,
        wx: document.getElementById('wx').value,
        range: parseFloat(document.getElementById('range').value) * 100 || 0
    };
    
    // 表单验证
    if (!formData.content || formData.content.length < 2) {
        showMessage('活动标题至少需要 2 个字符', 'error');
        return;
    }
    
    if (!formData.start_time) {
        showMessage('请选择开始时间', 'error');
        return;
    }
    
    if (formData.end_time && formData.end_time <= formData.start_time) {
        showMessage('结束时间必须晚于开始时间', 'error');
        return;
    }
    
    if (!formData.address) {
        showMessage('请输入活动地址', 'error');
        return;
    }
    
    if (!formData.wx) {
        showMessage('请输入联系方式', 'error');
        return;
    }
    
    // 禁用提交按钮，显示加载动画
    submitBtn.disabled = true;
    loading.style.display = 'block';
    
    try {
        const response = await fetch(MCP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: 'create_activity',
                arguments: formData
            })
        });
        
        const result = await response.json();
        
        if (result.error) {
            throw new Error(result.error.message);
        }
        
        if (result.result && result.result.content) {
            const data = JSON.parse(result.result.content[0].text);
            
            if (data.success) {
                showMessage('活动创建成功！正在跳转...', 'success');
                
                document.getElementById('activityForm').reset();
                resetDefaultTime();
                
                // 500ms 后跳转到活动详情页
                setTimeout(() => {
                    const activityUrl = 'https://fore.vip/st?id=' + data.id;
                    window.open(activityUrl, '_blank');
                }, 500);
            } else {
                throw new Error(data.message || '创建失败');
            }
        } else {
            throw new Error('响应格式错误');
        }
        
    } catch (error) {
        showMessage('创建失败：' + error.message, 'error');
    } finally {
        submitBtn.disabled = false;
        loading.style.display = 'none';
    }
}

// 显示消息
function showMessage(text, type) {
    const message = document.getElementById('message');
    message.innerHTML = text;
    message.className = 'message ' + type;
    message.style.display = 'block';
}

// 重置默认时间
function resetDefaultTime() {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('start_time').value = now.toISOString().slice(0, 16);
    
    const endTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    document.getElementById('end_time').value = endTime.toISOString().slice(0, 16);
}
