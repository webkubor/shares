<!-- 记住，只有具有滚动条并且内容溢出的元素才能触发 scroll 事件 -->
<template>
    <div class="card">
        <div class="card-title">indexDB测试</div>
        <div class="space-h">
            <div class="space-h">
                <input v-model="userName" type="text" placeholder="请输入用户名称" />
                <button data-variant="primary" @click="getUserById"> 搜索 </button>
            </div>
            <button data-variant="primary" @click="addUser"> 新增数据 </button>
            <button data-variant="primary" @click="onReset"> 重置 </button>
        </div>

    </div>
    <div class="card" v-if="searchList.length">
        <div class="card-title">检索结果</div>
        <div class="space-h card-row" v-for="(item, index) in searchList"
            :key="index">
            <span>
                {{ item.id }}
            </span>
            <span>
                {{ item.name }}
            </span>
            <span>
                {{ item.email }}
            </span>
            <span>

                <button data-variant="danger" @click="deleteUser(item.id)">
                    删除
                </button>
            </span>

        </div>
    </div>

    <div id="card-container">

        <div class="card">
            <div class="space-h card-row">
                <span>
                    ID
                </span>
                <span>
                    名称
                </span>
                <span>
                    邮箱
                </span>
                <span>
                    操作
                </span>
            </div>
        </div>
        <div class="card" v-for="(item, index) in list" :key="index">
            <div class="space-h card-row">
                <span>
                    {{ item.id }}
                </span>
                <span>
                    {{ item.name }}
                </span>
                <span>
                    {{ item.email }}
                </span>
                <span>

                    <button data-variant="danger" @click="deleteUser(item.id)">
                        删除
                    </button>
                </span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, nextTick, ref } from 'vue';
import { IndexedDBHelper } from '@/utils/IndexedDBHelper'
import { createRandomStr, createRandomNum } from '@/utils/random'
import { useRouter } from 'vue-router';

const router = useRouter()

let list = ref([])
let userName = ref(null)


let searchList = ref([])

// 创建一个IndexedDBHelper实例
let dbHelper = new IndexedDBHelper('MyAppDatabase', 1, 'Users');
// 用户数据示例
onMounted(async () => {
    await nextTick(); // 等待DOM更新
    initScroll()
    getAllUsers();
    console.log(document.referrer, 1111)
})



function openUrl() {
    router.replace({
        path: '/show/apple',
        query: {
            id: 1
        }
    })
    // let target= "https://payment.tpservice.pro/#/pay/mx/store/P1783793418077667330?payWay=store"
    // window.open(target)
    // window.open(target, '_blank');
    // window.history.replaceState({}, '0', 'https://manager.959skins.com/#/login?redirect=/dashboard');

}

// 添加用户数据
async function addUser() {
    let newUser = { id: createRandomNum(), name: createRandomStr(10), email: createRandomStr(5) + '@example.com' };
    try {
        let id = await dbHelper.add(newUser);
        window.$message?.success(`新用户已添加，ID为：${id}`)
        await getAllUsers()
    } catch (error) {
        console.error('添加用户失败:', error);
        window.$message?.error(`新用户添加失败，ID为：${newUser.id}`);

    }
}



function onReset() {
    searchList.value = []
}

// 更新用户数据
async function updateUser(id, updatedUser) {
    try {
        await dbHelper.put(updatedUser);
        window.$message?.success(`用户数据已更新`)
        await getAllUsers()
    } catch (error) {
        console.error('更新用户失败:', error);
    }
}


// 删除用户数据
async function deleteUser(id) {
    try {
        await dbHelper.delete(id);
        window.$message?.success(`id为${id}的用户已从数据库中删除`)
        await getAllUsers()
    } catch (error) {
        console.error('删除用户失败:', error);
    }
}


// 获取所有用户数据
async function getAllUsers() {
    try {
        let users = await dbHelper.getAll();
        list.value = users
        console.log('所有用户数据:', users);
    } catch (error) {
        console.error('获取所有用户失败:', error);
    }
}


// 获取单个用户数据
async function getUserById() {
    if (!userName.value) {
        window.$message?.error('请输入用户名称')
        return
    }
    console.log(userName.value, 'name')
    searchList.value = []
    try {
        // let user = await dbHelper.get('name', userName.value);
        let users = await dbHelper.fuzzySearch(userName.value);
        console.log('查询到的用户:', users);
        searchList.value = [...searchList.value, ...users]
    } catch (error) {
        console.error('获取用户失败:', error);
    }
}

function getDom(id: string) {
    return document.getElementById(id)
}



function initScroll() {
    let Dom = getDom('card-container')
    if (Dom) {
        console.log('获取到了DOM');
        // 添加滚动事件监听
        Dom.addEventListener('scroll', function () {
            // 获取卡片列表中所有卡片元素
            const cards = document.querySelectorAll('.card');
            // 遍历卡片元素
            cards.forEach(card => {
                // 计算卡片的可见性
                const top = card.offsetTop;
                const height = card.offsetHeight;
                const containerTop = Dom.scrollTop;
                const containerHeight = Dom.offsetHeight;

                if (top >= containerTop && top + height <= containerTop + containerHeight) {
                    // 如果卡片完全在可见区域内，则添加动画类
                    card.classList.add('puffIn');
                } else {
                    // 如果卡片不在可见区域内，则移除动画类
                    card.classList.remove('puffIn');
                }
            });
        });
    }
}



</script>
<style lang="scss" scoped>
.card-row {
    margin-top: 10px;

    span {
        display: inline-block;
        width: 200px;
        text-align: center;
    }

    &:hover {
        filter: drop-shadow(0px 0px 10px #FFB31C);
    }
}

#card-container {
    height: 400px;
    overflow: auto;
    border: 2px solid #FFB31C;
    filter: drop-shadow(0px 0px 10px #FFB31C);
    background: var(--webkubor-bg) ;
    font-weight: 600;
    height: calc(100vh - 100px) ;
    padding-top: 10px;
}
.card { border: 1px solid var(--border-color); border-radius: 10px; padding: 12px; margin-bottom: 12px; background: var(--bg-elevated); }
.card-title { font-weight: 700; margin-bottom: 8px; }
.space-h { display: flex; gap: 12px; align-items: center; }
</style>