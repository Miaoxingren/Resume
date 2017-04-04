# Resume

#### 简历制作步骤：
1. 修改`resume.json`
2. 运行命令`npm install`
3. 运行命令`npm run server`
4. 访问localhost: 8080

#### 格式说明：

    {
        // 简历分页
        "page": [
        {
            // 分列
            "column": [
            {
                // 模块
                "module": [
                {
                    // 概要模块
                    "name": "brief",
                    "data":
                    {
                        // 名称
                        "name": "XXX",
                        // 求职意向
                        "job": "XXX"
                    }
                },
                {
                    // 基本资料
                    "name": "basic",
                    "data": [
                    {
                        "icon": "age",
                        "content": "XXX"
                    },
                    {
                        "icon": "loc",
                        "content": "XXX"
                    },
                    {
                        "icon": "phone",
                        "content": "XXX"
                    },
                    {
                        "icon": "mail",
                        "content": "XXX"
                    }]
                },
                {
                    // 爱好
                    "name": "hobby",
                    "data": [
                    {
                        "icon": "movie",
                        "content": "XXX"
                    },
                    {
                        "icon": "delicacy",
                        "content": "XXX"
                    },
                    {
                        "icon": "read",
                        "content": "XXX"
                    },
                    {
                        "icon": "pig",
                        "content": "XXX"
                    }]
                },
                {
                    // 奖项
                    "name": "prize",
                    "data": ["XXX"]
                },
                {
                    // 证书
                    "name": "certificate",
                    "data": ["XXX", "XXX"]
                }]
            },
            {
                "module": [
                {
                    // 教育经历
                    "name": "education",
                    "data": [
                    {
                        "name": "XXX",
                        "headline": "XXX",
                        "content": "XXX"
                    }]
                },
                {
                    // 校内实践
                    "name": "practice",
                    "data": [
                    {
                        "name": "XXX",
                        "content": "XXX"
                    }]
                },
                {
                    // 实习经历
                    "name": "intern",
                    "data": [
                    {
                        "name": "XXX",
                        "headline": "XXX",
                        "content": "XXX"
                    }]
                }]
            }]
        },
        {
            "column": [
            {
                "module": [
                {
                    // 技能
                    "name": "skill",
                    "data": [
                    {
                        "name": "XXX",
                        // 掌握度
                        "degree": "50%"
                    }]
                },
                {
                    // 自我评价
                    "name": "evaluation",
                    "data": "XXX"
                }]
            },
            {
                "module": [
                {
                    // 项目经历
                    "name": "repo",
                    "data": [
                    {
                        "name": "XXX",
                        "headline": "XXX",
                        "content": "XXX"
                    }]
                }]
            }]
        }]
    }

#### icon font

[Icon moon App](https://icomoon.io/app)

添加自定义图标：
1. 启动`iconmoon app`
2. 导入`public/fonts/iconmoon.svg`中的图标
3. 从`iconmoon app`中选择图标
4. 生成图标并下载
5. 解压`iconmoon`并将`fonts`文件夹置于`public`文件夹下
6. 将`style.css`置于`public/css`文件夹下
7. 修改`style.css`，`src:  url('fonts/icomoon.....')`改为`src:  url('/fonts/icomoon.....')`
