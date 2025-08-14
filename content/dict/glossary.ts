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
    {
        term: "Hive",
        definition: "Hive数据仓库平台，hive是基于Hadoop的一个数据仓库工具，用来进行数据提取、转化、加载，这是一种可以存储、查询和分析存储在Hadoop中的大规模数据的机制。hive数据仓库工具能将结构化的数据文件映射为一张数据库表，并提供SQL查询功能，能将SQL语句转变成MapReduce任务来执行。",
        contributors: "猫颜",
        type: "大数据/数据仓库",
        links: [
            {
                name: "Hive 官方文档",
                url: "https://hive.apache.org/",
            },
            {
                name: "Hive 使用指南",
                url: "/blog/bid-data/hive/hive",
            },
        ],
    },
    {
        term: "Spark",
        definition: "Apache Spark 是一个开源的分布式大数据处理引擎，主要用于高效处理大规模数据集（从 GB 到 PB 级），支持多种计算场景，是当前大数据生态中最核心的技术之一。",
        contributors: "猫颜",
        type: "大数据/数据处理",
        links: [
            {
                name: "Spark 官方文档",
                url: "https://spark.apache.org/",
            },
            {
                name: "Spark 核心",
                url: "/blog/bid-data/spark/spark-core",
            },
            {
                name: "Spark 架构分析",
                url: "/blog/bid-data/spark/spark-architecture-analysis",
            }
        ],
    },
    {
        term: "差分攻击",
        definition: "差分攻击一般是指通过比较分析有特定区别的明文在通过加密后的变化传播情况来对密码算法进行破解的手段。在隐私保护领域，差分攻击一般指通过观察统计数据的变化，来识别某个被统计对象信息的攻击手段。对应的防御技术为差分隐私。",
        contributors: "猫颜",
        type: "专有名词",
        links: [],
    },
    {
        term: "差分隐私",
        definition: "差分隐私是一种用于保护个人隐私的技术，常用于分析敏感数据。它在分析之前向数据添加噪声或随机性，使攻击者难以确定特定个体的数据是否包含在分析中。这种技术有助于防止敏感信息的披露，同时仍然允许从数据中获得有用的见解。",
        contributors: "猫颜",
        type: "专有名词",
        links: [],
    },
    {
        term: "下钻",
        definition: "下钻是一种常见的数据分析术语，指的是在数据分析过程中，从宏观数据逐步深入到更细粒度层级的操作方式。通过“下钻”，分析者可以从总体数据中依次查看其子集或明细，以发现异常、趋势或潜在原因。常用于商业分析、数据统计等场景中，通过逐步细化维度（如从整体业务数据细化到区域、品类等具体数据）来挖掘潜在问题或洞察细节。",
        contributors: "猫颜",
        type: "大数据/数据分析",
        links: [],
    },
    {
        term: "Landing",
        definition: "在职场环境中，它指的是新员工在加入公司后，完成入职流程并开始正式工作之前的一段适应期或过渡期。这一过程被形象地称为“着陆”或“落地”，因此用Landing来描述。Landing的目的是为了帮助新员工尽快融入公司，适应新的工作环境和业务流程，从而发挥其工作价值。",
        contributors: "猫颜",
        type: "专有名词",
        links: [],
    }
];