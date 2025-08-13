export const glossary = [
    {
        term: "React",
        definition: "A JavaScript library for building user interfaces.",
        contributors: "猫颜",
        type: "前端/框架",
        links: [
            {
                name: "React 官方文档",
                url: "https://reactjs.org/",
            },
        ],
    },
    {
        term: "Maxwell",
        definition: "Maxwell 是一款基于 Java 开发的开源数据同步工具，主要用于实时捕获 MySQL 数据库的变更数据（CDC，Change Data Capture），并将这些变更以 JSON 格式发送到 Kafka、RabbitMQ 等消息队列或其他存储系统。它的核心原理是解析 MySQL 的 binlog（二进制日志），通过监控 binlog 中记录的插入（insert）、更新（update）、删除（delete）等操作，实时提取数据变更信息，从而实现源数据库与目标系统的数据同步。",
        contributors: "猫颜",
        type: "大数据/数据同步",
        links: [
            {
                name: "Maxwell 官方文档",
                url: "https://maxwells-daemon.io/",
            },
            {
                name: "Maxwell 使用指南",
                url: "/blog/bid-data/maxwell/maxwell",
            },
        ],
    },
];