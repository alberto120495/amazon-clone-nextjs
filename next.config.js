module.exports = {
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com"],
  },
  env: {
    stripe_public_key:
      process.env.STRIPE_PUBLIC_KEY ||
      "pk_test_51ItzJLJYvLIBvUAlS2lDxwXpvpcWx7NGS1Jq73XU2LUfRReoFBl3FsKcpSN8pHXkKZdHyTYjaxArsgqHxpG0w68D009J9ZsrpF",
  },
};
