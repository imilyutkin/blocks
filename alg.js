 $(function() {
        var numOfBlocks = Math.floor(Math.sqrt($(":not(:has(>div))").length));

        var root = $(':eq(0)');
        var nodes = getSeparatedNodes(root, numOfBlocks);

        $.each(function( index, value ) {
            $(value.addClass('lol'));
        });
    });

    function getSeparatedNodes(rootObj, numBlocks) {
        var nodes = [rootObj];

        while (nodes.length < numBlocks) {
            var maxWeightNode = nodes[0];
            var nodeIndex = 0;

            for (var i = 0; i < nodes.length; i++) {
                if (((weight(nodes[i]) > weight(maxWeightNode))
                              || ($(maxWeightNode).children().length == 1)) && ($(nodes[i]).children().length > 1)) {
                    maxWeightNode = nodes[i];
                    nodeIndex = i;
                }
                console.log(weight(nodes[i]));
            }

            if ($(maxWeightNode).children().length <= 1) {
                break;
            }

            nodes.splice(nodeIndex, 1);
            nodes = nodes.concat(maxWeightNode.children());
            console.log(nodes.length);
        }
        return nodes;
    }

    function weight(node) {
        var height = $(node).height();
        var width = $(node).width();
        var s = height * width;
        var lengthText = s / 140;

        return Math.log(lengthText * 0.1 + 1.01) * Math.log(s * 0.9 + 0.11);
    }
