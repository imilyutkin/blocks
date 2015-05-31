        $(function() {
            // var numOfBlocks = Math.ceil(Math.sqrt($(":not(:has(>div))").length)) + 1;
            var numOfBlocks = Math.ceil(Math.sqrt($(":not(:has(*))").length)) + 1;

            // var root = $('div.container');
            var root = $('body');
            var nodes = getSeparatedNodes(root, numOfBlocks);
            console.log(nodes.length)
            markSelectedBlocks(nodes);
        });

        function getSeparatedNodes(root, numOfBlocks) {
            var nodes = [];
            nodes.push(root);

            while (nodes.length < numOfBlocks) {
                var maxWeightNode = getMaxWeightBlock(nodes);
                var nodeIndex = 0;

                for (var i = 0; i < nodes.length; i++) {
                    var currentWeight = weight(nodes[i]);                    
                    console.log(weight(nodes[i]));
                    if ((weight(nodes[i]) >= weight(maxWeightNode) || $(maxWeightNode).children().length == 1) 
                        && $(nodes[i]).children().length > 0) {
                        maxWeightNode = nodes[i];
                        nodeIndex = i;
                    }
                    if (currentWeight < 1) {
                        nodes.splice(i, 1)
                    };
                }

                if ($(maxWeightNode).children().length < 1) {
                    break;
                }
                nodes.splice(nodeIndex, 1);
                
                var children = $(maxWeightNode).children(':not(script)');
                $.each(children, function(index, value) {
                    nodes.push(value);
                })
                
            }
            return nodes;
        }

        function getMaxWeightBlock(nodes) {
            var maxWeight = weight(nodes[0]);
            var maxWeightNode = nodes[0]; 
            if (nodes.length > 1) {
                for(var i = 1; i < nodes.length; i++) {
                    var currentWeight = weight(nodes[i]);
                    if (maxWeight < currentWeight) {
                       maxWeightNode = nodes[i];
                       break;
                    };
                }
            }
            return maxWeightNode;
        }

        function markSelectedBlocks(nodes) {
            $.each(nodes, function( index, value ) {
                $(value).addClass('semBlock');
            });
        }

        function weight(node) {
            var height = $(node).height();
            var width = $(node).width();
            var s = height * width;
            var lengthText = s / 140;

            return Math.log(lengthText * 0.1 + 1.01) * Math.log(s * 0.9 + 0.11);
        }