import Sale from "../../src/model/Sales.js";

const addSale = async (req, res) => {
  try {
    const { name, amountSold, numberOfSales } = req.body;
    if (!name || !amountSold || !numberOfSales) {
      return res.status(400).json({
        sucess: false,
        message: "All fields are required",
      });
    }
    if (isNaN(amountSold) || isNaN(numberOfSales)) {
      return res.status(400).json({
        sucess: false,
        message: "AmountSold and NumberOfSales must be number",
      });
    }

    const result = await Sale.create({
      name,
      amountSold,
      numberOfSales,
    });
    res.status(201).json({
      success: true,
      data: result,
      message: "New sales record added",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while adding sale",
      error: error.message,
    });
  }
};

const leaderBoard = async (req, res) => {
  try {
    const aggregated = await Sale.aggregate([
      {
        $group: {
          _id: "$name",
          totalSales: { $sum: "$amountSold" },
          totalDeals: { $sum: "$numberOfSales" },
        },
      },
      {
        $sort: { totalSales: -1 },
      },
    ]);

    const rankOrder = [];
    let currentRank = 1;

    aggregated.forEach((agent, index) => {
      if (index > 0 && agent.totalSales < aggregated[index - 1].totalSales) {
        currentRank = index + 1;
      }
      rankOrder.push({
        rank: currentRank,
        agentName: agent._id,
        totalSales: agent.totalSales,
        totalDeals: agent.totalDeals,
      });
    });

    const totalSales = rankOrder.reduce(
      (sum, agent) => sum + agent.totalSales,
      0
    );
    const totalDeals = rankOrder.reduce(
      (sum, agent) => sum + agent.totalDeals,
      0
    );
    return res.status(201).json({
      success: true,
      totalSales,
      totalDeals,
      data: rankOrder,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error while generating leaderboard",
      error: error.message,
    });
  }
};
export default { addSale, leaderBoard };
