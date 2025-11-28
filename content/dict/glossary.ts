export const glossary = [
    // React
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
    // Maxwell
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
    // Hive
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
    //Paimon
    {
        term: "Paimon",
        definition: "Apache Paimon 是一种数据湖格式，支持使用 Flink 和 Spark 构建实时 Lakehouse 架构，用于流式和批处理操作。Paimon 创新性地结合了数据湖格式和 LSM（日志结构化合并树）结构，将实时流式更新引入数据湖架构。",
        contributors: "猫颜",
        type: "大数据/数据湖",
        links: [
            {
                name: "Paimon 官方文档",
                url: "https://paimon.apache.org/docs/master/",
            },
            {
                name: "Paimon 数据湖",
                url: "/blog/bid-data/paimon/paimon",
            }
        ],
    },
    // Spark
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
    // Shuffle
    {
        term: "Shuffle",
        definition: "Shuffle 是 Spark 中一个重要的操作，用于在分布式计算中重新分布数据，以支持后续的计算操作。在 Spark 中，每个 RDD（Resilient Distributed Dataset）都有一个或多个分区，每个分区的数据可能分布在不同的节点上。当需要对 RDD 进行转换操作（如 map、filter、reduceByKey 等）时，Spark 会将每个分区的数据发送到负责处理该分区的节点上执行。然而，在某些情况下，不同节点上的数据需要进行合并或聚合，这就需要进行 Shuffle 操作。",
        contributors: "猫颜",
        type: "大数据/数据处理",
        aliases: ["shuffle"],
        links: [
            {
                name: "Spark Shuffle",
                url: "/blog/bid-data/spark/spark-shuffle",
            }
        ],
    },
    //Flink
    {
        term: "Flink",
        definition: "Apache Flink 是一个在有界数据流和无界数据流上进行有状态计算分布式处理引擎和框架。Flink 设计旨在所有常见的集群环境中运行，以任意规模和内存级速度执行计算。",
        contributors: "猫颜",
        type: "大数据/计算引擎",
        aliases: ["Apache Flink"],
        links: [
            {
                name: "Apache Flink 文档",
                url: "https://nightlies.apache.org/flink/flink-docs-master/zh/"
            }
        ]
    },
    // Docker
    {
        term: "Docker",
        definition: "Docker 是一个开源的容器化平台，用于打包、分发与运行应用及其依赖。通过镜像（Image）和容器（Container）的机制，Docker 在不同环境中提供一致的运行时，并结合 Docker Compose 支持多服务编排，常用于开发、测试与部署环节的标准化与自动化。",
        contributors: "猫颜",
        type: "中间件/容器化",
        aliases: ["Docker Engine", "Docker Compose"],
        links: [
            { name: "Docker 官方文档", url: "https://docs.docker.com/" },
            { name: "Docker Compose 文档", url: "https://docs.docker.com/compose/" },
            { name: "Docker CLI 参考", url: "https://docs.docker.com/engine/reference/commandline/docker/" },
            { name: "Docker 入门与实践（站内）", url: "/blog/middleware/docker/docker" }
        ]
    },
    // 差分攻击
    {
        term: "差分攻击",
        definition: "差分攻击一般是指通过比较分析有特定区别的明文在通过加密后的变化传播情况来对密码算法进行破解的手段。在隐私保护领域，差分攻击一般指通过观察统计数据的变化，来识别某个被统计对象信息的攻击手段。对应的防御技术为差分隐私。",
        contributors: "猫颜",
        type: "专有名词",
        links: [],
    },
    // 差分隐私
    {
        term: "差分隐私",
        definition: "差分隐私是一种用于保护个人隐私的技术，常用于分析敏感数据。它在分析之前向数据添加噪声或随机性，使攻击者难以确定特定个体的数据是否包含在分析中。这种技术有助于防止敏感信息的披露，同时仍然允许从数据中获得有用的见解。",
        contributors: "猫颜",
        type: "专有名词",
        links: [],
    },
    // 下钻
    {
        term: "下钻",
        definition: "下钻是一种常见的数据分析术语，指的是在数据分析过程中，从宏观数据逐步深入到更细粒度层级的操作方式。通过“下钻”，分析者可以从总体数据中依次查看其子集或明细，以发现异常、趋势或潜在原因。常用于商业分析、数据统计等场景中，通过逐步细化维度（如从整体业务数据细化到区域、品类等具体数据）来挖掘潜在问题或洞察细节。",
        contributors: "猫颜",
        type: "大数据/数据分析",
        links: [],
    },
    // Landing
    {
        term: "Landing",
        definition: "在职场环境中，它指的是新员工在加入公司后，完成入职流程并开始正式工作之前的一段适应期或过渡期。这一过程被形象地称为“着陆”或“落地”，因此用Landing来描述。Landing的目的是为了帮助新员工尽快融入公司，适应新的工作环境和业务流程，从而发挥其工作价值。",
        contributors: "猫颜",
        type: "专有名词",
        links: [],
    },
    // TTL
    {
        term: "TTL",
        definition: "TTL（Time To Live）是指数据在缓存中保持的时间长度。在缓存系统中，为了管理缓存数据的生命周期，通常会为每个缓存项设置一个TTL值。当缓存项的TTL过期后，缓存系统会自动将其从缓存中移除，以释放内存空间或确保数据的新鲜度。TTL的设置可以根据业务需求和性能考虑进行调整，常见的单位包括秒、分钟、小时等。",
        contributors: "猫颜",
        type: "专有名词",
        links: [],
    },
    // RD
    {
        term: "RD",
        definition: "R&D, Research and Development engineer，研发工程师，对某种不存在的事物进行系统的研究和开发并具有一定经验的专业工作者,或者对已经存在的事物进行改进以达到优化目的的专业工作者。",
        contributors: "猫颜",
        type: "专有名词",
        links: [],
    },
    // OLAP
    {
        term: "OLAP",
        definition: "在线分析处理（Online Analytical Processing）OLAP 是面向 数据分析与决策 的技术，核心是 “对海量历史数据进行复杂分析”，帮助管理者发现规律、制定策略。与之对比的则是：OLTP在线事务处理（Online Transaction Processing）",
        contributors: "猫颜",
        type: "专有名词",
        links: [],
    },
    // OLTP
    {
        term: "OLTP",
        definition: "在线事务处理（Online Transaction Processing）OLTP 是面向 日常业务操作 的实时数据处理技术，核心是 “处理高频、简短的事务”，确保业务系统（如电商、银行、超市）的实时运行。与之相对应的则是：OLAP，在线分析处理（Online Analytical Processing）",
        contributors: "猫颜",
        type: "专有名词",
        links: [],
    },
    // LSM-Tree
    {
        term: "LSM-Tree",
        definition: "LSM（Log-Structured Merge-Tree，合并树结构）是对数据结构的一种设计思想，核心是将更新后的数据先储存在内存中，达到一定标准后再统一写入磁盘，不需要再单个写入，可以有效提高写的速度。",
        contributors: "猫颜",
        type: "专有名词",
        links: [],
    }
];
